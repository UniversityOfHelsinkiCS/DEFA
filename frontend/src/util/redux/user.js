import jwt from 'jsonwebtoken'
import * as types from '../actionTypes'

const INITIAL_STATE = {
  token: null,
  user: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_PARSE_USER:
      return {
        token: action.token,
        user: jwt.decode(action.token)
      }
    case types.USER_LOG_OUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default userReducer
