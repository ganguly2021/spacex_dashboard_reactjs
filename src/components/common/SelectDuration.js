import React from 'react'
import propTypes from 'prop-types'

function SelectDuration(props) {
  // Destructure props
  const {
    onClickDuration,
    cur_duration,
    duration
  } = props

  const list = duration.map((item, index) => {
    return (
      <button
        className={cur_duration === index ? "dropdown-item active" : "dropdown-item"}
        key={Math.random()}
        onClick={(e) => { onClickDuration(e, index) }}
      >
        {item}
      </button>
    )
  })

  return (
    <div>
      {list}
    </div>
  )
}

SelectDuration.propTypes = {
  onClickDuration: propTypes.func,
  cur_duration: propTypes.number,
  duration: propTypes.array
}

export default SelectDuration
