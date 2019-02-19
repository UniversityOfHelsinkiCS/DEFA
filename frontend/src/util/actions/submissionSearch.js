import * as types from '../actionTypes'

export const changeInput = values => dispatch => dispatch({
  type: types.SEARCH_SUBMISSION_CHANGE_INPUT,
  values
})

export const submitSearchAttempt = () => dispatch => dispatch({
  type: types.SEARCH_SUBMISSION_SUBMIT_ATTEMPT
})

export const submitSearchSuccess = data => dispatch => dispatch({
  type: types.SEARCH_SUBMISSION_SUBMIT_SUCCESS,
  data
})
