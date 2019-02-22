import * as types from '../actionTypes'

const INITIAL_STATE = {
  inputs: {},
  results: [],
  disabled: false,
  loading: false
}

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

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SEARCH_USER_CHANGE_INPUT:
      return changeInput(state, action)
    case types.SEARCH_USER_SUBMIT_ATTEMPT:
      return {
        ...state,
        loading: true,
        disabled: true
      }
    case types.SEARCH_USER_SUBMIT_SUCCESS:
      return {
        ...state,
        results: action.data,
        loading: false
      }
    case types.USER_EDIT_SUCCESS:
      return {
        ...state,
        results: state.results.map(result => (
          result.id === action.data.id ? action.data : result
        ))
      }
    default:
      return state
  }
}

export default adminReducer
