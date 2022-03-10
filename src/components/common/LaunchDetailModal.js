import React, { Fragment, useState } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { clearRocketData } from './../../redux/actions/rocketActions'
import LaunchDetailRow from './LaunchDetailRow'

function LaunchDetailModal(props) {
  // Destructure props
  const {
    refBtnOpenModal,
    modal_data,
    clearRocketData,
    rocket
  } = props

  // hooks setup
  const [imgLoading, setLoading] = useState(true)

  let content = null
  let rocketContent = null
  let mission_patch_img = null
  let status_badge = null


  function onCloseReset() {
    setTimeout(() => {
      // reset image loading status to true
      setLoading(true)
      content = null
      rocketContent = null
      mission_patch_img = null

      // clear rocket data inside redux store
      clearRocketData()
    }, 100)
  }

  // rocket html data to output
  if (Object.keys(rocket.data).length !== 0) {
    rocketContent = (
      <div className="row my-3">
        <div className="col-md-12">
          <p>{rocket.data.description}
            <a
              href={rocket.data.wikipedia}
              target="_blank"
              rel="noreferrer"
            >Wikipedia</a>
          </p>
        </div>
      </div>
    )
  } else {

    rocketContent = (
      <div className="row my-3">
        <div className="col-md-12 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      </div>
    )
  }

  // set modal content
  if (Object.keys(modal_data).length !== 0) {
    if (modal_data.links.mission_patch_small !== null) {
      mission_patch_img = (
        <Fragment>
          <img
            height="100"
            width="150"
            alt="not found"
            src={`${modal_data.links.mission_patch_small}?_=${Math.random()}`}
            onLoad={() => setLoading(false)}
            hidden={imgLoading === true ? true : false}
          />
          <div className="spinner-border" role="status" hidden={imgLoading === true ? false : true}>
            <span className="visually-hidden"></span>
          </div>
        </Fragment>
      )
    } else {
      mission_patch_img = (<p>Image not provided.</p>)
    }

    // status badge html code
    if (modal_data.launch_success === true) {
      status_badge = (<span className="badge bg-success">Success</span>)
    } else if (modal_data.launch_success === false) {
      status_badge = (<span className="badge bg-danger">Failed</span>)
    } else if (modal_data.launch_success === null) {
      // upcoming badge
      // added here on the basis of date difference
      // convert launched_date to proper format
      // using moment js
      let date = moment(modal_data.launch_date_utc)
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

    content = (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {mission_patch_img}
            </div>
            <div className="col-md-8">
              <h5>{modal_data.mission_name} {status_badge}</h5>
              <p className="text-small">{modal_data.rocket.rocket_name}</p>
              <a
                href={modal_data.links.article_link}
                target="_blank"
                className="btn btn-sm text-secondary"
                rel="noreferrer"
              ><i className="fas fa-newspaper"></i></a>
              <a
                href={modal_data.links.wikipedia}
                target="_blank"
                className="btn btn-sm"
                rel="noreferrer"
              ><i className="fab fa-wikipedia-w"></i></a>
              <a
                href={modal_data.links.video_link}
                target="_blank"
                className="btn btn-sm text-danger"
                rel="noreferrer"
              ><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          {rocketContent}
          <LaunchDetailRow
            title="Flight Number"
            value={modal_data.flight_number}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Misson Name"
            value={modal_data.mission_name}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Rocket Type"
            value={modal_data.rocket.rocket_type}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Rocket Name"
            value={modal_data.rocket.rocket_name}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Manufacturer"
            value={modal_data.rocket.second_stage.payloads[0].manufacturer}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Nationality"
            value={modal_data.rocket.second_stage.payloads[0].nationality}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Launch Date"
            value={moment(modal_data.launch_date_utc).format("Do MMMM YYYY HH:MM A")}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Payload Type"
            value={modal_data.rocket.second_stage.payloads[0].payload_type}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Orbit"
            value={modal_data.rocket.second_stage.payloads[0].orbit}
            isBorderBottom={true}
          />

          <LaunchDetailRow
            title="Launch Site"
            value={modal_data.launch_site.site_name}
            isBorderBottom={false}
          />

        </div>
      </div>
    )
  } else {
    content = (
      <div className="container-fluid">
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#launchDetailModal"
        ref={refBtnOpenModal}
        hidden
      />

      {/* <!-- Modal --> */}
      <div className="modal fade" id="launchDetailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onCloseReset}></button>
            </div>
            <div className="modal-body">
              {content}
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

LaunchDetailModal.propTypes = {
  refBtnOpenModal: propTypes.object,
  modal_data: propTypes.object,
  clearRocketData: propTypes.func,
  rocket: propTypes.object
}

const mapStateToProps = (state) => ({
  rocket: state.rocket
})

const mapDispatchToProps = {
  clearRocketData
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchDetailModal)
