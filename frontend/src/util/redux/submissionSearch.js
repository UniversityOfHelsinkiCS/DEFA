import * as types from '../actionTypes'
import submissionSorter from './helpers/submissionSorter'

const INITIAL_STATE = {
  inputs: {},
  results: []
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
    }
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
    case types.SEARCH_SUBMISSION_SUCCESS:
      return {
        ...state,
        results: action.data.map(resultSubmissionOrderMapper)
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
    case types.SUBMISSION_GET_KOSKI_SUCCESS:
      return {
        ...state,
        results: state.results.map(user => ({
          ...user,
          submissions: user.submissions.map(submission => (
            submission.id === action.submission.id
              ? {
                ...submission,
                koski: action.submission.koski
              }
              : submission
          ))
        }))
      }
    default:
      return state
  }
}

export default submissionSearchReducer
