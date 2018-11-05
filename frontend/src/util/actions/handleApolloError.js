import { toast } from 'react-toastify'
import * as types from '../actionTypes'
import { logout } from './user'

export const DEFAULT_NETWORK_ERROR_MESSAGE = 'An unhandled error occured.'
export const DEFAULT_GRAPHQL_ERROR_MESSAGE = 'Invalid input(s) provided in query.'

export const errorActions = {
  TokenError: logout({ displayToast: false })
}

const dispatchErrorToast = dispatch => (message, defaultMessage) => {
  const important = Boolean(message)
  dispatch({
    type: types.TOAST,
    toast: {
      message: message || defaultMessage,
      options: {
        type: toast.TYPE.ERROR,
        autoClose: important ? 20000 : 5000,
        hideProgressBar: !important,
        pauseOnHover: important,
        closeOnClick: !important
      }
    }
  })
}

const handleGraphQLErrors = dispatch => graphQLErrors => {
  const firstMessage = graphQLErrors
    .filter(error => {
      if (!error.extensions) { return false }
      return error.extensions.toastable
    })
    .reduce((acc, curr) => acc || curr.message, null)
  dispatchErrorToast(dispatch)(firstMessage, DEFAULT_GRAPHQL_ERROR_MESSAGE)
  graphQLErrors
    .filter(error => {
      if (!error.extensions) { return false }
      return typeof error.extensions.code === 'string'
    }) // filter for errors with code defined.
    .map(error => error.extensions.code)
    .filter((code, index, self) => self.indexOf(code) === index && errorActions[code])
    // filter out duplicates and undefined actions.
    .forEach(code => errorActions[code](dispatch)) // execute actions.
}

const handleNetworkError = dispatch => networkError => {
  const { result } = networkError
  if (typeof result !== 'object') { return }
  dispatchErrorToast(dispatch)(result.message, DEFAULT_NETWORK_ERROR_MESSAGE)
  if (errorActions[result.code]) { errorActions[result.code](dispatch) }
}

const handleError = dispatch => errorObject => {
  if (errorObject.graphQLErrors) {
    handleGraphQLErrors(dispatch)(errorObject.graphQLErrors)
  } else {
    handleNetworkError(dispatch)(errorObject.networkError)
  }
}

export default handleError
