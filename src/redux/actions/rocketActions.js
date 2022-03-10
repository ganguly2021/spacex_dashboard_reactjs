import {
  ROCKET_REQUEST,
  ROCKET_RESPONSE,
  SET_ROCKET_DATA,
  CLEAR_ROCKET_DATA
} from './types'

import axios from 'axios'
import { apiBaseURL } from './../../utils/constant'

// this variable is used to check
// more than two API calls at once
let ajaxRequest = null

// Get rocket data using rocket id
export const getRocketData = (rocket_id) => (dispatch) => {

  // check whether already
  // an API call in progress
  if (ajaxRequest) {
    // cancel that API call
    ajaxRequest.cancel()

    // set is loading to true
    dispatch(rocketRequest)

    // clear rocket old data
    dispatch(clearRocketData())

    // create new cancelToken using axios for API call
    ajaxRequest = axios.CancelToken.source()

  } else {
    // set is loading to true
    dispatch(rocketRequest)

    // clear rocket old data
    dispatch(clearRocketData())

    // create new cancelToken using axios for API call
    ajaxRequest = axios.CancelToken.source()
  }

  // send api call
  axios.get(`${apiBaseURL}/rockets/${rocket_id}`, { cancelToken: ajaxRequest.token })
    .then(res => {
      // set is loading to false
      dispatch(rocketResponse())

      // set rocket data into redux store
      dispatch(setRocketData(res.data))
    }).catch(err => {
      // set is loading to false
      dispatch(rocketResponse())

      // clear rocket old data
      dispatch(clearRocketData())
    })
}

// set rocket data action creator
export const setRocketData = (payload) => {
  return {
    type: SET_ROCKET_DATA,
    payload: payload
  }
}

// set loading to true when api call
export const rocketRequest = () => {
  return {
    type: ROCKET_REQUEST
  }
}

// set loading to false when api call
export const rocketResponse = () => {
  return {
    type: ROCKET_RESPONSE
  }
}

// clear rocket data
export const clearRocketData = () => {
  return {
    type: CLEAR_ROCKET_DATA
  }
}
