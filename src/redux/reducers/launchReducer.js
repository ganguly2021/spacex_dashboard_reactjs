import {
  LAUNCH_REQUEST,
  LAUNCH_RESPONSE,
  SET_LAUNCH_DATA,
  CLEAR_LAUNCH_DATA,
  UPDATE_PAGINATION_INDEX
} from './../actions/types'


// initial state
const initialState = {
  data: [],
  isLoading: false,
  startIndex: 0,
  endIndex: 12
}

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LAUNCH_DATA:
      return {
        ...state,
        data: action.payload
      }
    case LAUNCH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case LAUNCH_RESPONSE:
      return {
        ...state,
        isLoading: false
      }
    case CLEAR_LAUNCH_DATA:
      return {
        ...state,
        data: [],
        startIndex: 0,
        endIndex: 12
      }
    case UPDATE_PAGINATION_INDEX:
      return {
        ...state,
        startIndex: action.payload.startIndex,
        endIndex: action.payload.endIndex
      }
    default:
      return state
  }
}