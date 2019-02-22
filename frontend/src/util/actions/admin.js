import * as types from '../actionTypes'

export const changeInput = values => dispatch => dispatch({
  type: types.SEARCH_USER_CHANGE_INPUT,
  values
})

export const submitSearchAttempt = () => dispatch => dispatch({
  type: types.SEARCH_USER_SUBMIT_ATTEMPT
})

export const submitSearchSuccess = data => dispatch => dispatch({
  type: types.SEARCH_USER_SUBMIT_SUCCESS,
  data
})

export const editUserAttempt = () => dispatch => dispatch({
  type: types.USER_EDIT_ATTEMPT
})

export const editUserSuccess = data => dispatch => dispatch({
  type: types.USER_EDIT_SUCCESS,
  data
})
