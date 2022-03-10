import {
  LAUNCH_REQUEST,
  LAUNCH_RESPONSE,
  SET_LAUNCH_DATA,
  CLEAR_LAUNCH_DATA,
  UPDATE_PAGINATION_INDEX
} from './types'

import axios from 'axios'
import { apiBaseURL } from './../../utils/constant'
import moment from 'moment'

// this variable is used to check
// more than two API calls at once
let ajaxRequest = null

// Get all launches data
export const getAllLaunches = () => (dispatch) => {

  // check whether already
  // an API call in progress
  if (ajaxRequest) {
    // cancel that API call
    ajaxRequest.cancel()

    // set isLoading to true
    dispatch(launchRequest())

    // clear launch old data if any
    dispatch(clearLaunchData())

    // create new cancelToken using axios for API call
    ajaxRequest = axios.CancelToken.source()

  } else {
    // set isLoading to true
    dispatch(launchRequest())

    // clear launch old data if any
    dispatch(clearLaunchData())

    // create new cancelToken using axios for API call
    ajaxRequest = axios.CancelToken.source()
  }

  // send API call to get All Launches
  axios.get(`${apiBaseURL}/launches`, { cancelToken: ajaxRequest.token })
    .then(res => {
      // set response data into redux state
      dispatch(setLauchData(res.data))

      // set isLoading to false
      dispatch(launchResponse())

    }).catch(err => {
      // set isLoading to false
      dispatch(launchResponse())

      // set data to empty
      // if any error occur
      dispatch(setLauchData([]))
    })

}

// update launch data based
// on selected filter in redux store
export const updateLaunchData = (filter) => (dispatch) => {

  let date_format = "YYYY-MM-DD"
  let filteredData = []
  let isFiltered = false

  let params = new URLSearchParams()

  // if start date & end date selected
  if ((filter.start_date !== null) && (filter.end_date !== null)) {
    // change date format to YYYY-MM-DD
    let start = moment(filter.start_date).format(date_format)
    let end = moment(filter.end_date).format(date_format)

    params.append("start", start)
    params.append("end", end)
  } else if (filter.start_date !== null) {
    // change date format to YYYY-MM-DD
    let start = moment(filter.start_date).format(date_format)

    params.append("start", start)
  } else if (filter.end_date !== null) {
    // change date format to YYYY-MM-DD
    let end = moment(filter.end_date).format(date_format)

    params.append("end", end)
  }

  if (filter.lf_type === 2) {
    // if launch filter => successful launches
    params.append("launch_success", "true")
  }

  if (filter.lf_type === 3) {
    // if launch filter => failed launches
    params.append("launch_success", "false")
  }


  // check whether already
  // an API call in progress
  if (ajaxRequest) {
    // cancel that API call
    ajaxRequest.cancel()

    // set isLoading to true
    dispatch(launchRequest())

    // clear launch old data if any
    dispatch(clearLaunchData())

    // create new cancelToken using axios for API call
    ajaxRequest = axios.CancelToken.source()

  } else {
    // set isLoading to true
    dispatch(launchRequest())

    // clear launch old data if any
    dispatch(clearLaunchData())

    // create new cancelToken using axios for API call
    ajaxRequest = axios.CancelToken.source()
  }

  // send API call
  axios.get(`${apiBaseURL}/launches?${params.toString()}`, { cancelToken: ajaxRequest.token })
    .then(res => {

      // filter data based of launch type
      if (filter.lf_type === 1) {
        // upcoming launches
        dispatch(() => {
          filteredData = res.data.filter((item, pos, self) => {
            // calculate date diffence from launch date to today
            // dateDiff = launch date - today
            // dateDiff >= 0 ? upcoming : not upcoming
            let today = moment(new Date())
            let launch_date = moment(item.launch_date_utc)
            let dateDiff = launch_date.diff(today, "days")

            return (dateDiff >= 0)
          })

          // set isFiltered to true
          isFiltered = true
        })
      }

      // filter based on duration
      if (filter.duration >= 0) {
        dispatch(() => {
          filteredData = filterByDuration((isFiltered ? filteredData : res.data), filter.duration)

          isFiltered = true
        })
      }

      // update launch data
      dispatch(setLauchData((isFiltered ? filteredData : res.data)))

      // set api is loading to false
      dispatch(launchResponse())

    }).catch(err => {
      // set api is loading to false
      dispatch(launchResponse())

      // set data to empty
      // if any error occur
      dispatch(setLauchData([]))
    })

}

// set launch response data into state
export const setLauchData = (payload) => {
  return {
    type: SET_LAUNCH_DATA,
    payload: payload
  }
}


// launch request
export const launchRequest = () => {
  return {
    type: LAUNCH_REQUEST
  }
}

// launch response
export const launchResponse = () => {
  return {
    type: LAUNCH_RESPONSE
  }
}

// druation filter function
export const filterByDuration = (data, index) => {
  const range = [
    7, // past 1 week
    30, // past 1 month
    90, // past 3 months
    180, // past 6 months
    365, // past 1 year
    730 // past 2 years
  ]

  // range[index] => number of days to subract from today date

  return data.filter((item, pos, self) => {
    // get today date
    let today = moment(new Date())
    // get launch date
    let launch_date = moment(item.launch_date_utc)
    // subtract number of days from today date
    let past_date = moment(new Date()).subtract(range[index], 'd')

    // check if launch_date is between
    // today & X days before
    // here X -> 7, 30, 90, 180, 365, 730
    return launch_date.isBetween(past_date, today)
  })
}

// clear launch data
export const clearLaunchData = () => {
  return {
    type: CLEAR_LAUNCH_DATA
  }
}

// update pagination start & end index
export const updatePaginationIndex = (payload) => {
  return {
    type: UPDATE_PAGINATION_INDEX,
    payload: payload
  }
}