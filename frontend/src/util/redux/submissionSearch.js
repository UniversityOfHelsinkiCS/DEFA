import * as types from '../actionTypes'
import submissionSorter from './helpers/submissionSorter'

const INITIAL_STATE = {
  inputs: {},
  results: [],
  disabled: false,
  loading: false
}

const resultSubmissionOrderMapper = result => ({
  ...result,
  submissions: result.submissions.sort(submissionSorter)
})

const changeInput = (state, action) => {
  const result = {
    ...state,
    inputs: {
      ...state.inputs,
      ...action.values
    },
    disabled: false
  }
  Object.entries(action.values).forEach(([key, value]) => {
    if (value.length === 0) {
      delete result[key]
    }
  })
  return result
}

const submissionSearchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SEARCH_SUBMISSION_CHANGE_INPUT:
      return changeInput(state, action)
    case types.SEARCH_SUBMISSION_SUBMIT_ATTEMPT:
      return {
        ...state,
        loading: true,
        disabled: true
      }
    case types.SEARCH_SUBMISSION_SUBMIT_SUCCESS:
      return {
        ...state,
        results: action.data.map(resultSubmissionOrderMapper),
        loading: false
      }
    case types.SEARCH_SUBMISSION_APPROVE_SUBMISSION_SUCCESS:
      return {
        ...state,
        results: state.results.map(user => ({
          ...user,
          submissions: user.submissions.map(submission => (
            submission.id === action.submission.id ? {
              ...submission,
              approval: action.submission.approval
            } : submission
          ))
        }))
      }
    default:
      return state
  }
}

export default submissionSearchReducer
