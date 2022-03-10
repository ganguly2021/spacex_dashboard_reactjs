import React from 'react'
import propTypes from 'prop-types'
import SelectDuration from './SelectDuration'
import SelectDate from './SelectDate'

function DateFilterModal(props) {
  // Destructure
  const {
    onClickDuration,
    cur_duration,
    refBtnCloseModal,
    lbl_date_filter,
    onDateChange,
    start_date,
    end_date,
    duration
  } = props

  return (
    <div>
      <button
        className="btn shadow-sm p-2 mb-5 bg-body rounded"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#datePickerModal"
      >
        <i className="far fa-calendar-alt"></i> {lbl_date_filter} <i className="fas fa-caret-down"></i>
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="datePickerModal" aria-labelledby="datePickerModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row shadow-sm bg-body rounded">
                <div className="col-md-3 border-end">
                  <SelectDuration
                    onClickDuration={onClickDuration}
                    cur_duration={cur_duration}
                    duration={duration}
                  />
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6">
                      <SelectDate
                        onDateChange={onDateChange}
                        soe="start"
                        date={start_date}
                        start_date={start_date}
                        end_date={end_date}
                      />
                    </div>
                    <div className="col-md-6">
                      <SelectDate
                        onDateChange={onDateChange}
                        soe="end"
                        date={end_date}
                        start_date={start_date}
                        end_date={end_date}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            ref={refBtnCloseModal}
            data-bs-dismiss="modal"
            hidden
          />
        </div>
      </div>
    </div>
  )
}

DateFilterModal.propTypes = {
  onClickDuration: propTypes.func,
  cur_duration: propTypes.number,
  refBtnCloseModal: propTypes.object,
  lbl_date_filter: propTypes.string,
  onDateChange: propTypes.func,
  start_date: propTypes.object,
  end_date: propTypes.object,
  duration: propTypes.array
}

export default DateFilterModal
