import * as types from '../actionTypes'

const INITIAL_STATE = []

const recursiveTypenameScrub = inputObject => Object.entries(inputObject).reduce(
  (acc, [key, value]) => {
    if (key === '__typename') return acc
    if (value instanceof Object) {
      return {
        ...acc,
        [key]: recursiveTypenameScrub(value)
      }
    }
    return {
      ...acc,
      [key]: value
    }
  },
  {}
)

const coursesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DEFA_COURSE_GET_ALL:
      return action.data.map(course => recursiveTypenameScrub(course))
    case types.DEFA_COURSE_CREATE:
      return [action.created, ...state]
    case types.DEFA_COURSE_UPDATE:
      return state.map(course => (
        course.id === action.edited.id
          ? {
            ...course,
            ...action.edited
          }
          : course
      ))
    case types.DEFA_COURSE_DELETE:
      return state.filter(course => course.id !== action.deleted.id)
    default:
      return state
  }
}

export default coursesReducer
