const mongoose = require('mongoose')
const resolvers = require('../../src/resolvers/submission')
const { SubmissionModel, UserModel } = require('../../src/models')
const asymmetricMatcher = require('../testUtils/asymmetricMatcher')

describe('submission resolvers', () => {
  describe('queries', () => {
    describe('submission', () => {
      const resolver = resolvers.Query.submission
      const parent = null
      const userData = {
        username: 'testuser20',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      const submissionData = {
        url: 'https://test.test',
        date: Number(new Date())
      }
      const ids = {}
      beforeAll(async () => {
        const user = await UserModel.create(userData)
        ids.user = user.id
        const submission = await SubmissionModel.create({
          ...submissionData,
          user: user._id
        })
        ids.submission = submission.id
      })
      afterAll(async () => {
        await SubmissionModel.findByIdAndDelete(ids.submission)
        await UserModel.findByIdAndDelete(ids.user)
      })

      describe('when args.id points to nonexistent submission', () => {
        const args = {}
        const context = {
          authorization: {
            role: 'ADMIN'
          }
        }

        it('returns null.', async () => {
          const result = await resolver(parent, args, context)
          expect(result).toBeNull()
        })
      })
      describe('when args.id points to a submission', () => {
        const args = {}
        beforeAll(() => {
          args.id = ids.submission
        })

        describe('when authorized as uploader', () => {
          const context = {
            authorization: {
              role: 'STUDENT'
            }
          }
          beforeAll(() => {
            context.authorization.id = ids.user
          })

          it('returns the submission.', async () => {
            const result = await resolver(parent, args, context)
            expect(result).toMatchObject({
              url: submissionData.url,
              id: asymmetricMatcher(actual => actual === ids.submission)
            })
          })
        })

        describe('when authorized as privileged', () => {
          const context = {
            authorization: {
              role: 'PRIVILEGED'
            }
          }

          it('returns the submission.', async () => {
            const result = await resolver(parent, args, context)
            expect(result).toMatchObject({
              url: submissionData.url,
              id: asymmetricMatcher(actual => actual === ids.submission)
            })
          })
        })

        describe('when authorized as third party', () => {
          const context = {
            authorization: {
              id: '0000000000000000',
              role: 'STUDENT'
            }
          }

          it('throws an error.', async () => {
            const asyncResolver = async () => resolver(parent, args, context)
            expect(asyncResolver()).rejects.toThrow()
          })
        })
      })
    })
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
        it('throws an error.', () => {
          const asyncResolver = async () => resolver(parent, args, context)
          expect(asyncResolver()).rejects.toThrow()
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
        it('throws an error.', async () => {
          const asyncResolver = async () => resolver(parent, args, context)
          expect(asyncResolver()).rejects.toThrow()
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
    const parent = null
    describe('createSubmission', () => {
      const resolver = resolvers.Mutation.createSubmission
      const args = {
        url: 'https://pepe.hands',
        comment: 'Additional information.'
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
      afterEach(async () => {
        await SubmissionModel.findOneAndDelete(args)
      })
      afterAll(async () => {
        await UserModel.findByIdAndDelete(ids.user)
      })
      describe('when not authenticated', () => {
        const context = notAuthenticatedContext
        it('throws an error.', () => {
          const asyncResolver = async () => resolver(parent, args, context)
          expect(asyncResolver()).rejects.toThrow()
        })
        it('does not create a submission in the database.', async () => {
          try {
            await resolver(parent, args, context)
          // eslint-disable-next-line no-empty
          } catch (e) {}
          const created = await SubmissionModel.findOne(args)
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
    describe('approveSubmission', () => {
      const resolver = resolvers.Mutation.approveSubmission
      const parent = null
      const userData = {
        username: 'testuser12',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      const submissionData = {
        url: 'https://test.test',
        date: Number(new Date()),
        approval: 'PENDING'
      }
      const argsStub = {
        approval: 'APPROVED'
      }
      const ids = {}
      beforeAll(async () => {
        const user = await UserModel.create(userData)
        ids.user = user.id
        const submission = await SubmissionModel.create({
          ...submissionData,
          user: user._id
        })
        ids.submission = submission.id
      })
      afterEach(async () => {
        await SubmissionModel.findByIdAndUpdate(ids.submission, submissionData)
      })
      afterAll(async () => {
        await SubmissionModel.findByIdAndDelete(ids.submission)
        await UserModel.findByIdAndDelete(ids.user)
      })

      describe('when authorized', () => {
        const context = {
          authorization: {
            role: 'PRIVILEGED'
          }
        }
        describe('when args.submission points to a submission', () => {
          const args = { ...argsStub }
          beforeAll(() => {
            args.submission = ids.submission
          })

          it('returns the edited submission.', async () => {
            const result = await resolver(parent, args, context)
            expect(result).toMatchObject({
              ...submissionData,
              date: new Date(submissionData.date),
              approval: args.approval,
              id: ids.submission
            })
          })
          it('changes the submission in the database.', async () => {
            await resolver(parent, args, context)
            const result = await SubmissionModel.findById(ids.submission)
            expect(result).toMatchObject({
              ...submissionData,
              date: new Date(submissionData.date),
              approval: args.approval,
              id: ids.submission
            })
          })
        })
        describe('when args.submission points to no submission.', () => {
          const args = argsStub

          it('returns null.', async () => {
            const result = await resolver(parent, args, context)
            expect(result).toBeNull()
          })
        })
      })
      describe('when unauthorized', () => {
        const context = {
          authorization: {
            role: 'STUDENT'
          }
        }
        const args = { ...argsStub }
        beforeAll(() => {
          args.submission = ids.submission
        })

        it('throws an error.', () => {
          const asyncResolver = async () => resolver(parent, args, context)
          expect(asyncResolver()).rejects.toThrow()
        })
        it('does not change the submission in the database.', async () => {
          try {
            await resolver(parent, args, context)
          // eslint-disable-next-line no-empty
          } catch (e) {}
          const result = await SubmissionModel.findById(ids.submission)
          expect(result).toMatchObject({
            ...submissionData,
            date: new Date(submissionData.date),
            id: ids.submission
          })
        })
      })
    })
  })
  describe('deleteSubmission', () => {
    const resolver = resolvers.Mutation.deleteSubmission
    const parent = null
    const userData = {
      username: 'testuser12',
      name: 'Test User',
      role: 'STUDENT',
      cn: 'Test Test User',
      studentNumber: '000000010',
      email: 'test@test.test'
    }
    const submissionData = {
      url: 'https://test.test',
      date: Number(new Date()),
      approval: 'PENDING'
    }
    const authenticatedContext = {}
    const argsStub = {}
    const ids = {}
    beforeAll(async () => {
      const user = await UserModel.create(userData)
      ids.user = user.id
      authenticatedContext.authorization = {
        id: user.id,
        role: user.role
      }
      const submission = await SubmissionModel.create({
        ...submissionData,
        user: user._id
      })
      ids.submission = submission.id
    })
    // afterEach(async () => {
    //   await SubmissionModel.findByIdAndUpdate(ids.submission, submissionData)
    // })
    afterAll(async () => {
      await UserModel.findByIdAndDelete(ids.user)
    })

    describe('when authorized', () => {
      const context = {
        authorization: {
          role: 'STUDENT'
        }
      }
      describe('when args point to own submission', () => {
        const args = { ...argsStub }
        beforeAll(() => {
          args.id = ids.submission
        })


        it('returns the deleted submissions Id.', async () => {
          const result = await resolver(parent, args, authenticatedContext)
          expect(result).toEqual(ids.submission)
        })
        it('removes the submission in the database.', async () => {
          await resolver(parent, args, authenticatedContext)
          const result = await SubmissionModel.findById(ids.submission)
          expect(result).toBeNull()
        })
      })
      describe('when args.submission points to no submission.', () => {
        const args = { id: ids.user, ...argsStub }

        it('returns null.', async () => {
          const result = await resolver(parent, args, context)
          expect(result).toBeNull()
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
      const userData = {
        username: 'testuser4',
        name: 'Test User',
        role: 'STUDENT',
        cn: 'Test Test User',
        studentNumber: '000000010',
        email: 'test@test.test'
      }
      const submissionData = {
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
