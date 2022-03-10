import React from 'react'
import propTypes from 'prop-types'
import TableRow from '../common/TableRow'
import moment from 'moment'
import LaunchDetailModal from '../common/LaunchDetailModal'

function TableDataView(props) {
  const {
    launch,
    refBtnOpenModal,
    openLaunchDetailModal,
    modal_data
  } = props

  let rows = null

  if (launch.isLoading) {
    // data is loading
    // then show loader inside table
    rows = (
      <tr>
        <td colSpan="7" className="text-center">
          <span className="spinner-border text-dark" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden"></span>
          </span>
        </td>
      </tr>
    )
  } else if (launch.data.length === 0) {
    // if launch data is empty array
    // even after loading then show
    // text message of empty data
    // table row
    rows = (
      <tr>
        <td colSpan="7" className="text-center">
          No result found.
        </td>
      </tr>
    )
  } else {
    // if launch has data then
    // create component using map
    // function on data array
    const paginatedData = launch.data.slice(launch.startIndex, launch.endIndex)

    rows = paginatedData.map((item, index) => {
      return (
        <TableRow
          key={Math.random()}
          sl_no={(index + (launch.startIndex + 1))}
          launched_date={moment(item.launch_date_utc).format("Do MMM YYYY HH:MM A")}
          location={item.launch_site.site_name}
          mission={item.mission_name}
          orbit={item.rocket.second_stage.payloads[0].orbit}
          launch_status={item.launch_success}
          rocket={item.rocket.rocket_name}
          openLaunchDetailModal={openLaunchDetailModal}
        />
      )
    })
  }

  return (
    <div className="table-responsive-md">
      <table className="table table-sm table-borderless table-hover shadow-sm p-3 mb-5 bg-body rounded">
        <thead>
          <tr className="bg-light">
            <th scope="col">No.</th>
            <th scope="col">Launched (UTC)</th>
            <th scope="col">Location</th>
            <th scope="col">Mission</th>
            <th scope="col">Orbit</th>
            <th scope="col">Launch Status</th>
            <th scope="col">Rocket</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <LaunchDetailModal
        refBtnOpenModal={refBtnOpenModal}
        modal_data={modal_data}
      />
    </div>
  )
}

TableDataView.propTypes = {
  launch: propTypes.object,
  refBtnOpenModal: propTypes.object,
  openLaunchDetailModal: propTypes.func,
  modal_data: propTypes.object
}

export default TableDataView
