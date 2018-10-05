import jwt from 'jsonwebtoken'
import * as types from '../actionTypes'

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
    case types.USER_PARSE_USER:
      return parseUser()
    case types.USER_LOG_OUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default userReducer
