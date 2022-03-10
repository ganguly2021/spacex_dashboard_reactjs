import {
  ROCKET_REQUEST,
  ROCKET_RESPONSE,
  SET_ROCKET_DATA,
  CLEAR_ROCKET_DATA
} from './../actions/types'

// initial state
const initialState = {
  isLoading: true,
  data: {}
}

export default function rocketReducer(state = initialState, action){
  switch (action.type){
    case ROCKET_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ROCKET_RESPONSE:
      return {
        ...state,
        isLoading: false
      }
    case SET_ROCKET_DATA:
      return {
        ...state,
        data: action.payload
      }
    case CLEAR_ROCKET_DATA:
      return {
        ...state,
        data: {}
      }
    default:
      return state
  }
}