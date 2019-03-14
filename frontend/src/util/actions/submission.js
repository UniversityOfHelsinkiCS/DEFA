import * as types from '../actionTypes'

export const getStudent = user => dispatch => dispatch({
  type: types.STUDENT_GET_ME,
  user
})

export const createSubmissionAction = submission => dispatch => dispatch({
  type: types.SUBMISSION_CREATE,
  submission
})

export const deleteSubmissionAction = id => dispatch => dispatch({
  type: types.SUBMISSION_DELETE,
  id
})
