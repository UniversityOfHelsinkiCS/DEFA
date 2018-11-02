import { toast } from 'react-toastify'
import * as types from '../actionTypes'
import { logout } from './user'

const DEFAULT_NETWORK_ERROR_MESSAGE = 'An unhandled error occured.'
const DEFAULT_GRAPHQL_ERROR_MESSAGE = 'Invalid input(s) provided in query.'

const errorActions = {
  logout: logout({ displayToast: false })
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
}

const handleNetworkError = dispatch => networkError => {
  const { result } = networkError
  if (typeof result !== 'object') { return }
  dispatchErrorToast(dispatch)(result.message, DEFAULT_NETWORK_ERROR_MESSAGE)
  if (result.actions) {
    result.actions
      .filter(action => errorActions[action])
      .forEach(action => errorActions[action](dispatch))
  }
}

const handleError = dispatch => errorObject => {
  if (errorObject.graphQLErrors) {
    handleGraphQLErrors(dispatch)(errorObject.graphQLErrors)
  } else {
    handleNetworkError(dispatch)(errorObject.networkError)
  }
}

export default handleError
