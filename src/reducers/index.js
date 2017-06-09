
import { combineReducers } from 'redux'
import auth from './auth'

const partyApp = combineReducers({
  auth
})

export default partyApp