import { combineReducers } from 'redux'
import reducer from './reducer'
import user from './user'
import credits from './credits'

export default combineReducers({
  reducer,
  user,
  credits
})
