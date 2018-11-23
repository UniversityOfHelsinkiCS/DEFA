import { toast } from 'react-toastify'
import * as types from '../actionTypes'

export const parseUser = token => dispatch => dispatch({
  type: types.USER_PARSE_USER,
  token
})

export const logout = options => dispatch => {
  window.localStorage.removeItem('DEFA-token')
  dispatch({
    type: types.USER_LOG_OUT,
    toast: options.displayToast ? {
      message: 'Logged out',
      options: {
        type: toast.TYPE.SUCCESS
      }
    } : undefined
  })
}

export const loginError = message => dispatch => {
  dispatch({
    type: types.TOAST,
    toast: {
      message,
      options: {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true
      }
    }
  })
}
