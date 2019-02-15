const jwt = require('jsonwebtoken')
const resolvers = require('../../src/resolvers/authenticate')
const { SECRET } = require('../../src/config')

describe('authenticate resolvers', () => {
  describe('queries', () => {
    describe('authenticate', () => {
      const resolver = resolvers.Query.authenticate
      const parent = null
      let context
      beforeEach(() => {
        context = {}
      })
      describe('when no token is provided', () => {
        const args = {}
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
        it('does not touch context.', async () => {
          await resolver(parent, args, context)
          expect(context).toEqual({})
        })
      })
      describe('when token is invalid', () => {
        const user = {
          id: '123456789abcdef',
          role: 'STUDENT'
        }
        const args = {
          token: jwt.sign(user, 'WRONGSECRET')
        }
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
        it('does not touch context.', async () => {
          await resolver(parent, args, context)
          expect(context).toEqual({})
        })
      })
      describe('when token is valid', () => {
        const user = {
          id: '123456789abcdef',
          role: 'STUDENT'
        }
        const args = {
          token: jwt.sign(user, SECRET)
        }
        it('returns true.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toEqual(true)
        })
        it('saves authorization object in context.', async () => {
          await resolver(parent, args, context)
          expect(context).toEqual({
            authorization: jwt.verify(args.token, SECRET)
          })
        })
      })
    })
  })
  describe('mutation', () => {
    describe('authenticate', () => {
      const resolver = resolvers.Mutation.authenticate
      const parent = null
      let context
      beforeEach(() => {
        context = {}
      })
      describe('when no token is provided', () => {
        const args = {}
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
        it('does not touch context.', async () => {
          await resolver(parent, args, context)
          expect(context).toEqual({})
        })
      })
      describe('when token is invalid', () => {
        const user = {
          id: '123456789abcdef',
          role: 'STUDENT'
        }
        const args = {
          token: jwt.sign(user, 'WRONGSECRET')
        }
        it('returns null.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toBeNull()
        })
        it('does not touch context.', async () => {
          await resolver(parent, args, context)
          expect(context).toEqual({})
        })
      })
      describe('when token is valid', () => {
        const user = {
          id: '123456789abcdef',
          role: 'STUDENT'
        }
        const args = {
          token: jwt.sign(user, SECRET)
        }
        it('returns true.', async () => {
          const value = await resolver(parent, args, context)
          expect(value).toEqual(true)
        })
        it('saves authorization object in context.', async () => {
          await resolver(parent, args, context)
          expect(context).toEqual({
            authorization: jwt.verify(args.token, SECRET)
          })
        })
      })
    })
  })
})
