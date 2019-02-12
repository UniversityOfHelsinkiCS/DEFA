import * as types from '../actionTypes'

const INITIAL_STATE = {
  submissions: []
}

const studentSubmissionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SUBMISSION_STUDENT_GET_ALL:
      return {
        ...state,
        submissions: action.submissions
      }
    case types.SUBMISSION_CREATE:
      return {
        ...state,
        submissions: state.submissions.concat(action.submission)
      }
    default:
      return state
  }
}

export default studentSubmissionReducer
