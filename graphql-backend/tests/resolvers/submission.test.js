const mongoose = require('mongoose')
const resolvers = require('../../src/resolvers/submission')
const { SubmissionModel, UserModel } = require('../../src/models')
const asymmetricMatcher = require('../testUtils/asymmetricMatcher')

describe('submission resolvers', () => {
  describe('queries', () => {
    describe('submissions', () => {
      const resolver = resolvers.Query.submissions
      const parent = null
      const usersData = [
        {
          username: 'testuser4',
          name: 'Test User',
          role: 'STUDENT',
          cn: 'Test Test User',
          studentNumber: '000000010',
          email: 'test@test.test'
        },
        {
          username: 'testuser5',
          name: 'Other User',
          role: 'STUDENT',
          cn: 'Other Other Other',
          studentNumber: '000000220',
          email: 'other@other.other'
        }
      ]
      const submissionsData = [
        { url: 'https://first.one' },
        { url: 'https://second.two' },
        { url: 'https://third.three' },
        { url: 'https://fourth.four' }
      ]
      const ids = {}
      const expectations = {
        firstMatch: [],
        secondMatch: [],
        bothMatch: []
      }
      beforeAll(async () => {
        const users = await Promise.all(usersData.map(userData => (
          UserModel.create(userData)
        )))
        const submissions = await Promise.all(submissionsData.map((
          (submissionData, index) => SubmissionModel.create({
            ...submissionData,
            user: users[(index % 2)]._id
          })
        )))
        ids.users = users.map(user => user.id)
        ids.submissions = submissions.map(submission => submission.id)
        submissions.forEach((submission, index) => {
          const matcher = expect.objectContaining({
            id: submission.id,
            url: submission.url
          })
          expectations.bothMatch.push(matcher)
          if (index % 2 === 0) {
            expectations.firstMatch.push(matcher)
          } else {
            expectations.secondMatch.push(matcher)
          }
        })
      })
      afterAll(async () => {
        await Promise.all([
          ...ids.users.map(id => UserModel.findByIdAndDelete(id)),
          ...ids.submissions.map(id => SubmissionModel.findByIdAndDelete(id))
        ])
      })

      describe('when not authenticated', () => {
        const context = {}
        const args = {}
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
      })
      describe('when authenticated as unauthorized', () => {
        const context = {}
        const args = {}
        beforeAll(() => {
          context.authorization = {
            id: ids.users[0],
            role: 'STUDENT'
          }
        })
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
      })
      describe('when authenticated as authorized', () => {
        const context = {}
        const privilegedUserData = {
          username: 'testuser6',
          name: 'Test User',
          role: 'PRIVILEGED',
          cn: 'Test Test User',
          studentNumber: '000000010',
          email: 'test@test.test'
        }
        beforeAll(async () => {
          const privilegedUser = await UserModel.create(privilegedUserData)
          context.authorization = {
            id: privilegedUser.id,
            role: privilegedUser.role
          }
          ids.privilegedUser = privilegedUser.id
        })
        afterAll(async () => {
          await UserModel.findByIdAndDelete(ids.privilegedUser)
        })
        describe('when no args are provided', () => {
          const args = {}
          it('returns all submissions.', async () => {
            const value = await resolver(parent, args, context)
            expect(value.length).toEqual(expectations.bothMatch.length)
            expect(value).toEqual(expect.arrayContaining(expectations.bothMatch))
          })
        })
        describe('when args includes a user object', () => {
          const args = {
            user: {
              name: 'User',
              studentNumber: '22'
            }
          }
          it('returns submissions whose user has fields like input.', async () => {
            const value = await resolver(parent, args, context)
            expect(value.length).toEqual(expectations.secondMatch.length)
            expect(value).toEqual(expect.arrayContaining(expectations.secondMatch))
          })
        })
      })
    })
  })
  describe('mutations', () => {
    const resolver = resolvers.Mutation.createSubmission
    const parent = null
    describe('createSubmission', () => {
      const args = {
        url: 'https://pepe.hands'
      }
      const userData = {
        username: 'testuser3',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      const ids = {}
      const notAuthenticatedContext = {}
      const authenticatedContext = {}
      beforeAll(async () => {
        const user = await UserModel.create(userData)
        ids.user = user.id
        authenticatedContext.authorization = {
          id: user.id,
          role: user.role
        }
      })
      afterAll(async () => {
        await Promise.all([
          UserModel.findByIdAndDelete(ids.user),
          SubmissionModel.deleteMany(args)
        ])
      })
      describe('when not authenticated', () => {
        const context = notAuthenticatedContext
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
        it('does not create a submission in the database.', async () => {
          const created = await SubmissionModel.findOne({
            ...args,
            id: ids.user
          })
          expect(created).toBeNull()
        })
      })
      describe('when authenticated', () => {
        const context = authenticatedContext
        it('returns created submission.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeTruthy()
          expect(value).toMatchObject({
            ...args,
            id: expect.any(String),
            user: mongoose.Types.ObjectId(ids.user)
          })
        })
        it('creates a submission in database.', async () => {
          await resolver(parent, args, context)
          const created = await SubmissionModel.findOne({
            ...args,
            user: mongoose.Types.ObjectId(ids.user)
          })
          expect(created).toMatchObject({
            ...args,
            id: expect.any(String),
            user: mongoose.Types.ObjectId(ids.user)
          })
        })
      })
    })
  })
  describe('children', () => {
    describe('user', () => {
      const resolver = resolvers.Submission.user
      const parent = {}
      const args = {}
      const context = {}
      userData = {
        username: 'testuser4',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      submissionData = {
        url: 'https://skeleton.doot'
      }
      const ids = {}
      beforeAll(async () => {
        const user = await UserModel.create(userData)
        const submission = await SubmissionModel.create({
          ...submissionData,
          user: user._id
        })
        ids.user = user.id
        ids.submission = submission.id
        parent.id = submission.id
        parent.user = submission.user
      })
      afterAll(async () => {
        await Promise.all([
          UserModel.findByIdAndDelete(ids.user),
          SubmissionModel.findByIdAndDelete(ids.submission)
        ])
      })
      it('returns parent\'s asociated user.', async () => {
        const user = await resolver(parent, args, context)
        expect(user).toMatchObject({
          id: asymmetricMatcher(actual => actual === ids.user),
          ...userData
        })
      })
    })
  })
})
