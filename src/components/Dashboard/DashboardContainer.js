import React, { Component, createRef } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { getAllLaunches, updateLaunchData, updatePaginationIndex } from './../../redux/actions/launchActions'
import DashboardView from './DashboardView'

class DashboardContainer extends Component {
  constructor(props) {
    super(props)

    // Create ref to close button of date filter modal
    this.btnCloseModal = createRef()

    this.state = {
      lf_type: 0,
      cur_duration: -1,
      lbl_date_filter: 'Date Filter',
      start_date: null,
      end_date: null,
      duration: [
        "Past week",
        "Past month",
        "Past 3 months",
        "Past 6 months",
        "Past year",
        "Past 2 years",
        "None"
      ],
      lf_label: [
        "All Launches",
        "Upcoming Launches",
        "Successful Launches",
        "Failed Launches",
      ]
    }
  }


  // handle launch filter change
  onLaunchFilterChange = (e, lf_type) => {
    e.preventDefault()

    // update launch filter state
    // lf_type -> Launch Filter
    // 0 -> All Launches
    // 1 -> Upcoming Launches
    // 2 -> Successful Launches
    // 3 -> Failed Launches
    this.setState({ lf_type: lf_type })

    if (lf_type !== 0) {
      this.props.history.push(`/?${this.createURLParams("lf_type", lf_type)}`)
    } else {
      // remove lf_type params from url
      // if all launches is selected
      this.props.history.push(`/?${this.removeURLParams("lf_type")}`)
    }
  }

  // handle duration filter click
  onClickDuration = (e, cur_duration) => {
    e.preventDefault()

    // update launch filter state
    // lf_type -> Launch Filter
    // -1 -> none selected
    // 0 -> Past week
    // 1 -> Past month
    // 2 -> Past 3 months
    // 3 -> Past 6 months
    // 4 -> Past 1 year
    // 5 -> Past 2 years
    // 6 -> None

    // if none is selected
    if (cur_duration === 6) {
      this.setState({
        cur_duration: -1,
        lbl_date_filter: 'Date Filter',
        start_date: null,
        end_date: null
      })

      // update url get variable
      this.props.history.push(`/?${this.createURLParams("none", cur_duration)}`)

    } else {
      this.setState((prevState) => {
        return {
          cur_duration: cur_duration,
          lbl_date_filter: prevState.duration[cur_duration],
          start_date: null,
          end_date: null
        }
      })

      // update url get variable
      this.props.history.push(`/?${this.createURLParams("dur", cur_duration)}`)
    }

    // close modal 
    // by clicking on button
    // dynamically
    this.btnCloseModal.current.click()
  }

  onDateChange = (date, soe) => {
    let params = '';

    // date format for moment js
    let date_format = "YYYY-MM-DD"

    // soe => start or end
    if (soe === "start") {

      // create url query params
      // start => start date
      params = this.createURLParams("start", moment(date).format(date_format))

      this.setState((prevState) => {
        return {
          start_date: date,
          cur_duration: -1,
          lbl_date_filter: moment(date).format("Do MMMM YY") + " to " + (prevState.end_date === null ? "?" : moment(prevState.end_date).format("Do MMMM YY"))
        }
      })
    } else {
      // create url query params
      // end => end date
      params = this.createURLParams("end", moment(date).format(date_format))

      this.setState((prevState) => {
        return {
          end_date: date,
          cur_duration: -1,
          lbl_date_filter: (prevState.start_date === null ? "?" : moment(prevState.start_date).format("Do MMMM YY")) + " to " + moment(date).format("Do MMMM YY")
        }
      })

      // close modal 
      // by clicking on button
      // dynamically
      //this.btnCloseModal.current.click()
    }

    // update url query params
    this.props.history.push(`/?${params}`)
  }

  createURLParams = (key, value) => {
    let params = new URLSearchParams(this.props.location.search)

    // if key already exist
    if (params.has(key)) {
      if (key === "dur") {
        // remove start date
        params.delete("start")
        // remove end date
        params.delete("end")

        // update duration
        params.set(key, value)
      } else if (key === "start" || key === "end") {
        // remove duration
        params.delete("dur")

        // update date
        params.set(key, value)
      } else if (key === "none") {
        // remove duration
        params.delete("dur")
        // remove start date
        params.delete("start")
        // remove end date
        params.delete("end")
      } else {
        // update params value
        params.set(key, value)
      }
    } else {
      if (key === "dur") {
        // remove start date
        params.delete("start")
        // remove end date
        params.delete("end")

        // add duration
        params.append(key, value)
      } else if (key === "start" || key === "end") {
        // remove duration
        params.delete("dur")

        // add date
        params.append(key, value)
      } else if (key === "none") {
        // remove duration
        params.delete("dur")
        // remove start date
        params.delete("start")
        // remove end date
        params.delete("end")
      } else {
        // add params value
        params.append(key, value)
      }
    }

    // remove pagination params p whenever filter update
    if (params.has("p")) {
      params.delete("p")
    }

    return params.toString()
  }

  removeURLParams = (key) => {
    let params = new URLSearchParams(this.props.location.search)

    // check if param exist
    if (params.has(key)) {
      // delete params
      params.delete(key)
    }

    return params.toString()
  }

  updateFilterFromURL = () => {
    // URL query parametes
    let params = new URLSearchParams(this.props.location.search)

    // Date format for moment js
    let date_format = "YYYY-MM-DD"

    // launch type filter
    if (params.has("lf_type")) {
      let lf_type = parseInt(params.get("lf_type"))

      // check is not a number
      if (!isNaN(lf_type)) {
        // check range between 1 to 3
        if (lf_type >= 1 && lf_type <= 3) {
          this.setState({ lf_type: lf_type })
        }
      }
    }

    // duration filter
    if (params.has("dur")) {
      let duration = parseInt(params.get("dur"))

      // check is not a number
      if (!isNaN(duration)) {
        // check range between 0 to 5
        if (duration >= 0 && duration <= 5) {
          this.setState((prevState) => {
            return {
              cur_duration: duration,
              lbl_date_filter: prevState.duration[parseInt(params.get("dur"))],
              start_date: null,
              end_date: null
            }
          })
        }
      }

    }

    // start & end date filter
    if (params.has("start") && params.has("end")) {
      // check date in valid format or not
      let isStartValid = moment(params.get("start"), date_format).isValid()
      let isEndValid = moment(params.get("end"), date_format).isValid()

      // if both date valid
      if (isStartValid && isEndValid) {
        let start_date = moment(params.get("start"), date_format)
        let end_date = moment(params.get("end"), date_format)

        // check date difference between
        // start_date & end_date
        // end_date >= start_date
        if (end_date.diff(start_date, "days") >= 0) {
          this.setState((prevState) => {
            return {
              start_date: start_date._d,
              end_date: end_date._d,
              cur_duration: -1,
              lbl_date_filter: moment(start_date).format("Do MMMM YY") + " to " + moment(end_date).format("Do MMMM YY")
            }
          })
        }
      } else if (isStartValid) {
        let start_date = moment(params.get("start"), date_format)

        this.setState((prevState) => {
          return {
            start_date: start_date._d,
            cur_duration: -1,
            lbl_date_filter: moment(start_date).format("Do MMMM YY") + " to ?"
          }
        })
      } else if (isEndValid) {
        let end_date = moment(params.get("end"), date_format)

        this.setState((prevState) => {
          return {
            end_date: end_date._d,
            cur_duration: -1,
            lbl_date_filter: "? to " + moment(end_date).format("Do MMMM YY")
          }
        })
      }
    } else if (params.has("start")) {
      // check date in valid format or not
      let isStartValid = moment(params.get("start"), date_format).isValid()

      // if start date valid
      if (isStartValid) {
        let start_date = moment(params.get("start"), date_format)

        this.setState((prevState) => {
          return {
            start_date: start_date._d,
            cur_duration: -1,
            lbl_date_filter: moment(start_date).format("Do MMMM YY") + " to ?"
          }
        })
      }
    } else if (params.has("end'")) {
      // check date in valid format or not
      let isEndValid = moment(params.get("end"), date_format).isValid()

      // if end date valid
      if (isEndValid) {
        let end_date = moment(params.get("end"), date_format)

        this.setState((prevState) => {
          return {
            end_date: end_date._d,
            cur_duration: -1,
            lbl_date_filter: "? to " + moment(end_date).format("Do MMMM YY")
          }
        })
      }
    }
  }

  componentDidMount() {
    // get URL params
    let params = new URLSearchParams(this.props.location.search)

    // Convert URL params into object like this { p: 2, lf_type: 2 }
    let paramsObj = Object.fromEntries(params.entries())

    // check the length of number of keys in object
    let paramsLen = Object.keys(paramsObj).length

    // if params has only one key & its for pagination like /?p=3
    let onlyPage = ((paramsLen === 1) && (params.has("p")) ? true : false)

    // if paramsLength is zero i.e /?
    // or paramsLength is one having only pagination p like /?p=5
    if (paramsLen === 0 || onlyPage) {
      // get all data from launches API
      this.props.getAllLaunches()
    } else {
      // update filter from URL query params if any
      // this update triggers the componentDidUpdate
      // and makes an API call to update the launches data
      this.updateFilterFromURL()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let filter = {}

    // check update
    const isLaunchFilterUpdate = prevState.lf_type !== this.state.lf_type
    const isStartDateUpdate = prevState.start_date !== this.state.start_date
    const isEndDateUpdate = prevState.end_date !== this.state.end_date
    const isDurationUpdate = prevState.cur_duration !== this.state.cur_duration

    // if state update occur
    // then call onFilterChangeUpdateData
    let update = false

    if (isLaunchFilterUpdate || isStartDateUpdate || isEndDateUpdate || isDurationUpdate) {
      let temp = {
        lf_type: this.state.lf_type,
        duration: this.state.cur_duration,
        start_date: this.state.start_date,
        end_date: this.state.end_date
      }

      // copy object
      filter = Object.assign({}, temp)

      update = true
    }

    if (update) {
      this.onFilterChangeUpdateData(filter)
    }
  }

  // update launch data
  // based on filter selected
  onFilterChangeUpdateData = (filter) => {
    // calling function from launch actions
    this.props.updateLaunchData(filter)
  }

  render() {
    return (
      <DashboardView
        {...this.props}
        {...this.state}
        onLaunchFilterChange={this.onLaunchFilterChange}
        onClickDuration={this.onClickDuration}
        refBtnCloseModal={this.btnCloseModal}
        onDateChange={this.onDateChange}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  launch: state.launch
})

const mapDispatchToProps = {
  getAllLaunches,
  updateLaunchData,
  updatePaginationIndex
}

DashboardContainer.propTypes = {
  launch: propTypes.object,
  getAllLaunches: propTypes.func,
  updateLaunchData: propTypes.func,
  updatePaginationIndex: propTypes.func,
  history: propTypes.object,
  location: propTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardContainer))
