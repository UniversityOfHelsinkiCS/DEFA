import * as types from '../actionTypes'

export const changeInput = values => dispatch => dispatch({
  type: types.SEARCH_SUBMISSION_CHANGE_INPUT,
  values
})

export const submitSearchSuccess = data => dispatch => dispatch({
  type: types.SEARCH_SUBMISSION_SUCCESS,
  data
})

export const approveSubmissionSuccess = submission => dispatch => dispatch({
  type: types.SEARCH_SUBMISSION_APPROVE_SUBMISSION_SUCCESS,
  submission
})

export const getKoskiSuccess = submission => dispatch => dispatch({
  type: types.SUBMISSION_GET_KOSKI_SUCCESS,
  submission
})

export const getKoskiFailure = submission => dispatch => dispatch({
  type: types.SUBMISSION_GET_KOSKI_FAILURE,
  submission
})
