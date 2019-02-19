const jwt = require('jsonwebtoken')
const resolvers = require('../../src/resolvers/user')
const { SECRET } = require('../../src/config')
const { UserModel, SubmissionModel } = require('../../src/models')

describe('user resolvers', () => {
  describe('queries', () => {
    describe('me', () => {
      const resolver = resolvers.Query.me
      const parent = null
      const args = {}
      describe('when not authenticated', () => {
        const context = {}
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
      })
      describe('when authenticated', () => {
        const userData = {
          username: 'testuser',
          name: 'Test User',
          role: 'STUDENT',
          cn: 'Test Test User',
          studentNumber: '000000010',
          email: 'test@test.test'
        }
        const context = {}
        const expectations = {}
        beforeAll(async () => {
          const user = await UserModel.create(userData)
          expectations.user = user
          context.authorization = {
            id: user.id,
            role: user.role
          }
        })
       afterAll(async () => {
          await UserModel.findByIdAndDelete(expectations.user.id)
        })

        it('returns authenticated user.', async () => {
          const value = await resolver(parent, args, context)
          expect(value._doc).toBeTruthy()
          expect(value._doc).toEqual(expectations.user._doc)
        })
      })
    })
  })
  describe('mutations', () => {
    describe('login', () => {
      const resolver = resolvers.Mutation.login
      const parent = null
      const args = {
        username: 'testuser1',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      const notAuthenticatedContext = {}
      const unauthorizedContext = {}
      const authenticatedContext = {}
      const adminData = {
        username: 'admin',
        name: 'Admin User',
        role: 'ADMIN',
        cn: 'Admin User',
        studentNumber: '000000000',
        email: 'admin@admin.admin'
      }
      const privilegedData = {
        username: 'privileged',
        name: 'Privileged User',
        role: 'PRIVILEGED',
        cn: 'Privileged User',
        studentNumber: '000000001',
        email: 'privileged@privileged.privileged'
      }
      const ids = {}
      beforeAll(async () => {
        const [admin, privileged] = await UserModel.create([adminData, privilegedData])
        authenticatedContext.authorization = {
          id: admin.id,
          role: admin.role
        }
        unauthorizedContext.authorization = {
          id: privileged.id,
          role: privileged.role
        }
        ids.admin = admin.id
        ids.privileged = privileged.id
      })
      afterEach(async () => {
        await UserModel.findOneAndRemove(args)
      })
      afterAll(async () => {
        await Promise.all([
          UserModel.findByIdAndDelete(ids.admin),
          UserModel.findByIdAndDelete(ids.privileged)
        ])
      })
      describe('when not authenticated', () => {
        const context = notAuthenticatedContext
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
        it('does not create a user in database.', async () => {
          await resolver(parent, args, context)
          const user = await UserModel.findOne(args)
          expect(user).toBeNull()
        })
      })
      describe('when authenticated as unauthorized', () => {
        const context = unauthorizedContext
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
        it('does not create a user in database.', async () => {
          await resolver(parent, args, context)
          const user = await UserModel.findOne(args)
          expect(user).toBeNull()
        })
      })
      describe('when authenticated', () => {
        const context = authenticatedContext
        it('returns a json web token.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toEqual(expect.any(String))
          expect(jwt.verify(value, SECRET)).toEqual({
            iat: expect.any(Number),
            exp: expect.any(Number),
            id: expect.any(String),
            name: args.name,
            role: args.role
          })
        })
        it('Creates a user in database.', async () => {
          await resolver(parent, args, context)
          const user = await UserModel.findOne(args)
          expect(user).toBeTruthy()
        })
        describe('and user already exists in database', () => {
          beforeEach(async () => {
            await UserModel.create(args)
          })
          it('returns a json web token.', async () => {
            const value = await resolver(parent, args, context)
            expect(value).toEqual(expect.any(String))
            expect(jwt.verify(value, SECRET)).toEqual({
              iat: expect.any(Number),
              exp: expect.any(Number),
              id: expect.any(String),
              name: args.name,
              role: args.role
            })
          })
          it('does not create another user in database.', async () => {
            await resolver(parent, args, context)
            const users = await UserModel.find(args)
            expect(users.length).toEqual(1)
          })
        })
      })
    })

    describe('editUser', () => {
      const resolver = resolvers.Mutation.editUser
      const userData = {
        username: 'testuseredit',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      const adminData = {
        username: 'testadmin',
        name: 'Test User',
        role: 'ADMIN',
        cn: 'Test Test User',
        studentNumber: '000000000',
        email: 'test@test.test'
      }
      const parent = null
      const args = {
        username: userData.username,
        values: {
          name: 'Test User edited',
          role: 'PRIVILEGED',
          cn: 'Test Test User edited',
          studentNumber: '000000001',
          email: 'test@edited.test'
        }
      }
      const ids = {}

      beforeAll(async () => {
        const [user, admin] = await UserModel.create([userData, adminData])
        ids.user = user.id
        ids.admin = admin.id
      })
      afterEach(async () => {
        await UserModel.findByIdAndUpdate(ids.user, userData)
      })
      afterAll(async () => {
        await Promise.all([
          UserModel.findByIdAndDelete(ids.user),
          UserModel.findByIdAndDelete(ids.admin)
        ])
      })

      describe('when authorized', () => {
        const context = {
          authorization: {
            role: 'ADMIN'
          }
        }
        it('returns updated user.', async () => {
          const response = await resolver(parent, args, context)
          expect(response).toMatchObject({
            ...userData,
            ...args.values
          })
        })
        it('changes user in database.', async () => {
          await resolver(parent, args, context)
          const user = await UserModel.findById(ids.user)
          expect(user).toMatchObject({
            ...userData,
            ...args.values
          })
        })
      })
      describe('when not authorized', () => {
        const context = {
          authorization: {
            role: 'PRIVILEGED'
          }
        }
        it('returns null.', async () => {
          const response = await resolver(parent, args, context)
          expect(response).toBeNull()
        })
        it('does not change user in database.', async () => {
          await resolver(parent, args, context)
          const user = await UserModel.findById(ids.user)
          expect(user).toMatchObject(userData)
        })
      })
    })
  })
  describe('children', () => {
    describe('submissions', () => {
      const resolver = resolvers.User.submissions
      const parent = {}
      const args = {}
      const context = {}
      const userData = {
        username: 'testuser2',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      submissionsData = [
        { url: 'https://test.test' },
        { url: 'https://test1.test' }
      ]
      expectations = {}
      beforeAll(async () => {
        const user = await UserModel.create(userData)
        const submissions = await SubmissionModel.create(submissionsData.map(submission => ({
          ...submission,
          user: user._id
        })))
        parent.id = user.id
        expectations.submissions = submissions.map(submission => submission._doc)
      })
      afterAll(async () => {
        await UserModel.findByIdAndDelete(parent.id)
      })
      it('Returns all submissions of parent user.', async () => {
        const value = await resolver(parent, args, context)
        expect(value.length).toEqual(2)
        expect(value).toEqual(
          expect.arrayContaining(
            expectations.submissions.map(
              expectation => expect.objectContaining(expectation)
            )
          )
        )
      })
    })
  })
})
