import { toast } from 'react-toastify'
import * as types from '../actionTypes'
import { logout } from './user'

const DEFAULT_ERROR_MESSAGE = 'An unhandled error occured.'

const errorActions = {
  logout: logout({ displayToast: false })
}

// const handleGraphQLErrors = () => () => {}

const handleNetworkError = dispatch => networkError => {
  const { result } = networkError
  if (typeof result !== 'object') { return }
  dispatch({
    type: types.TOAST,
    toast: {
      message: result.message || DEFAULT_ERROR_MESSAGE,
      options: {
        type: toast.TYPE.ERROR,
        autoClose: !result.message
      }
    }
  })
  if (result.actions) {
    result.actions
      .filter(action => errorActions[action])
      .forEach(action => errorActions[action](dispatch))
  }
}

const handleError = dispatch => errorObject => {
  // handleGraphQLErrors(dispatch)(errorObject.graphQLErrors)
  handleNetworkError(dispatch)(errorObject.networkError)
}

export default handleError
