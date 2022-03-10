import React from 'react'
import propTypes from 'prop-types'
import moment from 'moment'

export default function TableRow(props) {
  // Destructure props
  const {
    sl_no,
    launched_date,
    location,
    mission,
    orbit,
    launch_status,
    rocket,
    openLaunchDetailModal
  } = props

  let status_badge = null

  if (launch_status === true) {
    status_badge = (<span className="badge bg-success">Success</span>)
  } else if (launch_status === false) {
    status_badge = (<span className="badge bg-danger">Failed</span>)
  } else if (launch_status === null) {
    // upcoming badge
    // added here on the basis of date difference
    // convert launched_date to proper format
    // using moment js
    let date = moment(launched_date, "Do MMMM YYYY HH:MM A")
    let today = moment()

    // calculate date difference b/w launched_date and today
    // if diff >= 0 then upcoming else not
    let diff = date.diff(today)

    if (diff >= 0) {
      status_badge = (<span className="badge bg-warning">Upcoming</span>)
    } else {
      status_badge = (<span className="badge bg-dark">Unknown</span>)
    }

  }

  return (
    <tr onClick={(e) => openLaunchDetailModal(e, sl_no)} style={{ cursor: "pointer" }}>
      <th scope="row">{sl_no}</th>
      <td>{launched_date}</td>
      <td>{location}</td>
      <td>{mission}</td>
      <td>{orbit}</td>
      <td>{status_badge}</td>
      <td>{rocket}</td>
    </tr>
  )
}

TableRow.propTypes = {
  sl_no: propTypes.number,
  launched_date: propTypes.string,
  location: propTypes.string,
  mission: propTypes.string,
  orbit: propTypes.string,
  launch_status: propTypes.bool,
  rocket: propTypes.string,
  openLaunchDetailModal: propTypes.func
}
