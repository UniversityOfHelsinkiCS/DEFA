import * as types from '../actionTypes'

export const createDEFACourse = created => dispatch => dispatch({
  type: types.DEFA_COURSE_CREATE,
  created
})

export const deleteDEFACourse = deleted => dispatch => dispatch({
  type: types.DEFA_COURSE_DELETE,
  deleted
})

export const getDEFACourses = data => dispatch => dispatch({
  type: types.DEFA_COURSE_GET_ALL,
  data
})

export const editDEFACourse = edited => dispatch => dispatch({
  type: types.DEFA_COURSE_UPDATE,
  edited
})
