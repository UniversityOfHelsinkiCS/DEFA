import * as types from '../actionTypes'

const INITIAL_STATE = []

const coursesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DEFA_COURSE_GET_ALL:
      return action.data
    case types.DEFA_COURSE_CREATE:
      return state.concat(action.created)
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
