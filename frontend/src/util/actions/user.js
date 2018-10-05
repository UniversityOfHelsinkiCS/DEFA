import { toast } from 'react-toastify'
import * as types from '../actionTypes'

export const parseUser = () => dispatch => dispatch({
  type: types.USER_PARSE_USER
})

export const logout = () => dispatch => {
  window.localStorage.removeItem('DEFA-token')
  dispatch({
    type: types.USER_LOG_OUT,
    toast: {
      message: 'Logged out',
      options: {
        type: toast.TYPE.SUCCESS
      }
    }
  })
}
