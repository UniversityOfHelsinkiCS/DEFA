import * as types from '../actionTypes'

export const getStudentSubmissions = submissions => dispatch => dispatch({
  type: types.SUBMISSION_STUDENT_GET_ALL,
  submissions
})

export const createSubmissionAction = submission => dispatch => dispatch({
  type: types.SUBMISSION_CREATE,
  submission
})
