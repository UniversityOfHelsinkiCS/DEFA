import { combineReducers } from 'redux'
import user from './user'
import uploadCredits from './uploadCredits'
import studentSubmissions from './studentSubmissions'
import submissionSearch from './submissionSearch'
import admin from './admin'

export default combineReducers({
  user,
  uploadCredits,
  studentSubmissions,
  submissionSearch,
  admin
})
