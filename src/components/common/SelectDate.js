import React from 'react'
import propTypes from 'prop-types'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.css'

function SelectDate(props) {
  // Destructing props
  const {
    onDateChange,
    soe,
    date,
    start_date,
    end_date
  } = props

  return (
    <Calendar
      onChange={(date, e) => onDateChange(date, soe)}
      value={date}
      minDate={soe === "end" ? start_date : null}
      maxDate={soe === "start" ? end_date : null}
    />
  )
}

SelectDate.propType = {
  onDateChange: propTypes.func,
  soe: propTypes.string,
  date: propTypes.object,
  start_date: propTypes.object,
  end_date: propTypes.object
}

export default SelectDate
