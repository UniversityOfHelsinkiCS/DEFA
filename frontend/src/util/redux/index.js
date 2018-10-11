import { combineReducers } from 'redux'
import reducer from './reducer'
import user from './user'
import uploadCredits from './uploadCredits'

export default combineReducers({
  reducer,
  user,
  uploadCredits
})
