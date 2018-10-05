import * as types from '../actionTypes'

const INITIAL_STATE = {
  delimiter: '',
  file: null,
  headers: [],
  credits: []
}

const uploadCreditsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPLOAD_CREDITS_RESET:
      return {
        ...INITIAL_STATE,
        delimiter: state.delimiter
      }
    case types.UPLOAD_CREDITS_CHANGE_DELIMITER:
      return {
        ...state,
        delimiter: action.value
      }
    case types.UPLOAD_CREDITS_CHANGE_FILE:
      return {
        ...state,
        file: action.value
      }
    case types.UPLOAD_CREDITS_CHANGE_CREDITS:
      return {
        ...state,
        headers: action.value.headers,
        credits: action.value.credits
      }
    default:
      return state
  }
}

export default uploadCreditsReducer
