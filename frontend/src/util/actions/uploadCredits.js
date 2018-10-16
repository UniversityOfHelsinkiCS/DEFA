import * as types from '../actionTypes'

export const changeDelimiter = value => dispatch => dispatch({
  type: types.UPLOAD_CREDITS_CHANGE_DELIMITER,
  value
})

export const changeFile = value => dispatch => dispatch({
  type: types.UPLOAD_CREDITS_CHANGE_FILE,
  value
})

export const changeCredits = value => dispatch => dispatch({
  type: types.UPLOAD_CREDITS_CHANGE_CREDITS,
  value
})
