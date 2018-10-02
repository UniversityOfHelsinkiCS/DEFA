import jwt from 'jsonwebtoken'

const INITIAL_STATE = {
  token: null,
  user: null
}

const parseUser = () => {
  const token = window.localStorage.getItem('DEFA-token')
  return {
    token,
    user: jwt.decode(token)
  }
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_PARSE_USER':
      return parseUser()
    case 'USER_LOG_OUT':
      return INITIAL_STATE
    default:
      return state
  }
}

export default userReducer
