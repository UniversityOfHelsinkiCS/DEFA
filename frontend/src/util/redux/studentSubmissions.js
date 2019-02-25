import * as types from '../actionTypes'
import submissionSorter from './helpers/submissionSorter'

const INITIAL_STATE = {
  submissions: []
}

const studentSubmissionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SUBMISSION_STUDENT_GET_ALL:
      return {
        ...state,
        submissions: action.submissions.sort(submissionSorter)
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
    default:
      return state
  }
}

export default studentSubmissionReducer
