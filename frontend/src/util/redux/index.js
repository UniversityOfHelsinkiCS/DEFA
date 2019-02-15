import { combineReducers } from 'redux'
import user from './user'
import uploadCredits from './uploadCredits'
import studentSubmissions from './studentSubmissions'

export default combineReducers({
  user,
  uploadCredits,
  studentSubmissions
})
