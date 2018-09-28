export const parseUser = () => dispatch => dispatch({
  type: 'USER_PARSE_USER'
})

export const logout = () => dispatch => {
  window.localStorage.removeItem('DEFA-token')
  dispatch({
    type: 'USER_LOG_OUT'
  })
}
