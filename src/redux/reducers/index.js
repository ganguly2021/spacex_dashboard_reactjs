import { combineReducers } from 'redux'
import launchReducer from './launchReducer'
import rocketReducer from './rocketReducer'

// Root reducer
export default combineReducers({
  launch: launchReducer,
  rocket: rocketReducer
})