import { combineReducers } from 'redux'
import user from './user'
import uploadCredits from './uploadCredits'

export default combineReducers({
  user,
  uploadCredits
})
