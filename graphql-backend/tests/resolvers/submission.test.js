const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const resolvers = require('../../src/resolvers/submission')
const { SubmissionModel, UserModel } = require('../../src/models')

describe('submission resolvers', () => {
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
        UserModel.findByIdAndDelete(ids.user)
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
        await UserModel.findByIdAndDelete(ids.user)
      })
      it('returns parent\'s asociated user.', async () => {
        const user = await resolver(parent, args, context)
        expect(user).toMatchObject({
          id: expect.any(String),
          ...userData
        })
      })
    })
  })
})
