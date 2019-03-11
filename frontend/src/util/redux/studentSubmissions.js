import * as types from '../actionTypes'
import submissionSorter from './helpers/submissionSorter'

const INITIAL_STATE = {
  submissions: [],
  updated: false
}

const studentSubmissionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.STUDENT_GET_ME:
      return {
        ...state,
        submissions: action.user.submissions.sort(submissionSorter)
      }
    case types.SUBMISSION_CREATE:
      return {
        ...state,
        submissions: [
          {
            ...action.submission,
            updated: true
          },
          ...state.submissions
        ]
      }
    case types.SUBMISSION_DELETE:
      return {
        ...state,
        submissions: state.submissions.filter(sub => sub.id !== action.id)
      }
    case types.SUBMISSION_GET_KOSKI_SUCCESS:
      return {
        ...state,
        submissions: state.submissions.map(submission => (
          submission.id === action.submission.id
            ? {
              ...submission,
              koski: action.submission.koski
            }
            : submission
        ))
      }
    default:
      return state
  }
}

export default studentSubmissionReducer
