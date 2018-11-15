import applyAccess from '../../../src/schema/validators/applyAccess'
import { IQueries, IQuery, Iresolve, IContext, IUser, IvalidatorFunction } from '../../../src/schema/types/interface'

describe('applyAccess function', () => {
  let type: {
    queries: IQueries,
    mutations: IQueries
  }
  const resolver = jest.fn()
  afterEach(() => {
    resolver.mockClear()
  })

  describe('when type has missing access levels', () => {
    beforeEach(() => {
      type = {
        queries: {
          funkyQuery: {
            resolve: resolver as Iresolve,
            access: undefined
          } as unknown as IQuery
        },
        mutations: {}
      }
    })

    it('throws an error.', () => {
      expect(() => applyAccess(type)).toThrowError()
    })
  })

  describe('when access level is a function', () => {
    const accessIndicator = jest.fn()
    const accessFunction: IvalidatorFunction = (parent, args, context) => {
      if (args.item.owner !== context.user.attributes.cn) {
        throw new Error('Error: test')
      }
      accessIndicator()
    }
    const testContext = {
      user: {
        attributes: {
          cn: 'username'
        }
      } as IUser
    } as unknown as IContext
    let testArgs: {
      item: {
        owner: string
      }
    }
    beforeEach(() => {
      type = {
        queries: {
          funkyQuery: {
            resolve: resolver as Iresolve,
            access: accessFunction
          } as unknown as IQuery
        },
        mutations: {}
      }
      testArgs = {
        item: {
          owner: testContext.user.attributes.cn
        }
      }
    })
    afterEach(() => {
      accessIndicator.mockClear()
    })

    it('does not throw an error.', () => {
      expect(() => applyAccess(type)).not.toThrowError()
    })

    it('uses the function as a validator.', () => {
      applyAccess(type).queries.funkyQuery.resolve(null, testArgs, testContext)
      expect(accessIndicator).toHaveBeenCalled()
    })

    it('returns queries without access fields.', () => {
      expect(applyAccess(type)).toEqual({
        queries: {
          funkyQuery: expect.objectContaining({
            access: undefined
          })
        },
        mutations: {}
      })
    })

    describe('when trying to access unauthorized', () => {
      beforeEach(() => {
        testArgs = {
          item: {
            owner: 'other user'
          }
        }
      })

      it('the resolver throws an error.', () => {
        const funkyResolver = applyAccess(type).queries.funkyQuery.resolve
        expect(() => funkyResolver(null, testArgs, testContext)).toThrowError()
      })

      it('the resolver is not called.', () => {
        const funkyResolver = applyAccess(type).queries.funkyQuery.resolve
        try {
          funkyResolver(null, testArgs, testContext)
        // tslint:disable-next-line:no-empty
        } catch (e) {}
        expect(resolver).not.toHaveBeenCalled()
      })
    })

    describe('when trying to access authorized', () => {
      it('the resolver does not throw an error.', () => {
        const funkyResolver = applyAccess(type).queries.funkyQuery.resolve
        expect(() => funkyResolver(null, testArgs, testContext)).not.toThrowError()
      })

      it('the resolver is called.', () => {
        const funkyResolver = applyAccess(type).queries.funkyQuery.resolve
        funkyResolver(null, testArgs, testContext)
        expect(resolver).toHaveBeenCalled()
      })
    })
  })
})
