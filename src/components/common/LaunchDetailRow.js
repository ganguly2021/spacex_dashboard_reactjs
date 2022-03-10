import React from 'react'
import propTypes from 'prop-types'

function LaunchDetailRow(props) {
  // Destructure
  const {
    isBorderBottom,
    title,
    value
  } = props

  return (
    <div className={`row ${isBorderBottom === true ? "border-bottom" : ""}`}>
      <div className="col-md-4">
        <p>{title}</p>
      </div>
      <div className="col-md-8">
        <p>{value}</p>
      </div>
    </div>
  )
}

LaunchDetailRow.propTypes = {
  isBorderBottom: propTypes.bool,
  title: propTypes.string,
  value: propTypes.any
}

export default LaunchDetailRow
