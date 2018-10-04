import { toast } from 'react-toastify'

export const parseUser = () => dispatch => dispatch({
  type: 'USER_PARSE_USER'
})

export const logout = () => dispatch => {
  window.localStorage.removeItem('DEFA-token')
  dispatch({
    type: 'USER_LOG_OUT',
    toast: {
      message: 'Logged out',
      options: {
        type: toast.TYPE.SUCCESS
      }
    }
  })
}
