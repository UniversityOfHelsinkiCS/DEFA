import * as types from '../actionTypes'
import submissionSorter from './helpers/submissionSorter'

const INITIAL_STATE = {
  submissions: []
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
    default:
      return state
  }
}

export default studentSubmissionReducer
