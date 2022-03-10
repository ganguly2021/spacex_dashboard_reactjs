import React from 'react'
import propTypes from 'prop-types'
import LaunchFilterList from '../common/LaunchFilterList'
import DateFilterModal from '../common/DateFilterModal'
import TableDataContainer from '../TableData/TableDataContainer'
import Pagination from '../common/Pagination'

function DashboardView(props) {
  // Destructure
  const {
    onLaunchFilterChange,
    lf_type,
    onClickDuration,
    cur_duration,
    refBtnCloseModal,
    lbl_date_filter,
    onDateChange,
    start_date,
    end_date,
    duration,
    lf_label,
    launch,
    updatePaginationIndex
  } = props

  return (
    <div className="conainter-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-start">
            <DateFilterModal
              onClickDuration={onClickDuration}
              cur_duration={cur_duration}
              refBtnCloseModal={refBtnCloseModal}
              lbl_date_filter={lbl_date_filter}
              onDateChange={onDateChange}
              start_date={start_date}
              end_date={end_date}
              duration={duration}
            />
          </div>
          <div className="col-md-6 text-end">
            <LaunchFilterList
              filterChange={onLaunchFilterChange}
              currrentFilter={lf_type}
              filterType={lf_label}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <TableDataContainer />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {launch.data.length !== 0 ? <Pagination launch={launch} updatePaginationIndex={updatePaginationIndex} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardView.propTypes = {
  onLaunchFilterChange: propTypes.func,
  lf_type: propTypes.number,
  onClickDuration: propTypes.func,
  cur_duration: propTypes.number,
  refBtnCloseModal: propTypes.object,
  lbl_date_filter: propTypes.string,
  onDateChange: propTypes.func,
  start_date: propTypes.object,
  end_date: propTypes.object,
  duration: propTypes.array,
  lf_label: propTypes.array,
  launch: propTypes.object,
  updatePaginationIndex: propTypes.func
}

export default DashboardView
