import handleError, {
  DEFAULT_GRAPHQL_ERROR_MESSAGE,
  DEFAULT_NETWORK_ERROR_MESSAGE,
  errorActions
} from '../../../src/util/actions/handleApolloError'
import * as types from '../../../src/util/actionTypes'

const basicError = {
  path: ['someFunction', 'otherFunction'],
  locations: [{ line: 1, column: 1 }, { line: 5, column: 12 }],
  message: 'Error: error'
}

const toastableError = {
  ...basicError,
  extensions: {
    toastable: true
  }
}

const networkError = {
  result: {
    bodyUsed: true,
    headers: {},
    ok: false,
    redirected: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://example.com'
  },
  stack: 'stack/stack/...',
  statusCode: 403,
  bodyText: 'Unauthorized',
  columnNumber: 20,
  fileName: 'http://example.com/example.js > ...',
  lineNumber: 53
}

describe('Apollo error handling', () => {
  const dispatch = jest.fn()
  let errorObject
  const testActions = [jest.fn(), jest.fn()]
  const testParams = ['test', 'test2']
  beforeAll(() => {
    errorActions.test = () => testActions[0](testParams[0])
    errorActions.anotherTest = () => testActions[1](testParams[1])
  })
  afterEach(() => {
    dispatch.mockClear()
    testActions.forEach(action => action.mockClear())
  })

  describe('when encountering GraphQL errors', () => {
    describe('and no errors are marked as toastable', () => {
      beforeEach(() => {
        errorObject = {
          graphQLErrors: [
            basicError,
            basicError
          ]
        }
        handleError(dispatch)(errorObject)
      })

      it('toasts default graphql error message', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: types.TOAST,
          toast: {
            message: DEFAULT_GRAPHQL_ERROR_MESSAGE,
            options: expect.any(Object)
          }
        })
      })
    })

    describe('and an error is marked as toastable', () => {
      beforeEach(() => {
        errorObject = {
          graphQLErrors: [
            basicError,
            toastableError,
            {
              ...toastableError,
              message: 'Error: other error'
            }
          ]
        }
      })

      it('toasts the message of the first marked error', () => {
        handleError(dispatch)(errorObject)
        expect(dispatch).toHaveBeenCalledWith({
          type: types.TOAST,
          toast: {
            message: toastableError.message,
            options: expect.any(Object)
          }
        })
      })

      it('toasts no more than one message.', () => {
        handleError(dispatch)(errorObject)
        expect(dispatch).toHaveBeenCalledTimes(1)
      })
    })

    describe('and errors have codes defined.', () => {
      beforeEach(() => {
        errorObject = {
          graphQLErrors: [
            basicError,
            {
              ...basicError,
              extensions: {
                code: 'test'
              }
            },
            {
              ...basicError,
              extensions: {
                code: 'other_code'
              }
            },
            {
              ...basicError,
              extensions: {
                code: 'test'
              }
            },
            {
              ...basicError,
              extensions: {
                code: 'anotherTest'
              }
            }
          ]
        }
      })

      it('executes actions for all unique codes.', () => {
        expect(testActions[0]).not.toHaveBeenCalled()
        expect(testActions[1]).not.toHaveBeenCalled()
        handleError(dispatch)(errorObject)
        expect(testActions[0]).toHaveBeenCalledWith(testParams[0])
        expect(testActions[1]).toHaveBeenCalledWith(testParams[1])
      })
      it('does not execute an action more than once.', () => {
        handleError(dispatch)(errorObject)
        expect(testActions[0]).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when encountering a network error', () => {
    describe('and the error is generic', () => {
      beforeEach(() => {
        errorObject = {
          networkError
        }
        handleError(dispatch)(errorObject)
      })

      it('toasts the default network error message.', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: types.TOAST,
          toast: {
            message: DEFAULT_NETWORK_ERROR_MESSAGE,
            options: expect.any(Object)
          }
        })
      })
    })

    describe('and the error includes a json body with a message field', () => {
      const message = 'An informative error message'
      beforeEach(() => {
        errorObject = {
          networkError: {
            ...networkError,
            result: {
              ...networkError.result,
              message
            }
          }
        }
      })

      it('toasts the provided error message.', () => {
        handleError(dispatch)(errorObject)
        expect(dispatch).toHaveBeenCalledWith({
          type: types.TOAST,
          toast: {
            message,
            options: expect.any(Object)
          }
        })
      })

      describe('and a code is specified in the json body.', () => {
        beforeEach(() => {
          errorObject.networkError.result.code = 'test'
        })

        it('executes the specified errorActions.', () => {
          expect(testActions[0]).not.toHaveBeenCalled()
          handleError(dispatch)(errorObject)
          expect(testActions[0]).toHaveBeenCalledWith(testParams[0])
          expect(testActions[1]).not.toHaveBeenCalled()
        })
      })
    })
  })
})
