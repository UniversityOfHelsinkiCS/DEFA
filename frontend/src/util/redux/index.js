import { combineReducers } from 'redux'
import user from './user'
import studentSubmissions from './studentSubmissions'
import submissionSearch from './submissionSearch'
import admin from './admin'
import courses from './courses'

export default combineReducers({
  user,
  studentSubmissions,
  submissionSearch,
  admin,
  courses
})
