import callBuilder from '../apiConnection'

export const getHello = () => {
  const route = ''
  const prefix = 'GET_SOMETHING'
  return callBuilder(route, prefix)
}

export default (state = { data: [] }, action) => {
  switch (action.type) {
    case 'GET_SOMETHING_ATTEMPT':
      return {
        ...state,
        pending: true,
      }
    case 'GET_SOMETHING_FAILURE':
      return {
        ...state,
        pending: false,
        error: true,
      }
    case 'GET_SOMETHING_SUCCESS':
      return {
        ...state,
        pending: false,
        error: false,
        hello: action.response
      }
    default:
      return state
  }
}