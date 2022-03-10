import React, { Component, createRef } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRocketData } from './../../redux/actions/rocketActions'
import TableDataView from './TableDataView'

class TableDataContainer extends Component {
  constructor(props) {
    super(props)

    this.refBtnOpenModal = new createRef()

    this.state = {
      modal_data: {}
    }
  }

  openLaunchDetailModal = (e, id) => {
    e.preventDefault()

    let index = (id - 1)
    let data = this.props.launch.data[index]

    this.setState({ modal_data: Object.assign({}, data), })

    // set rocket data into redux store
    this.props.getRocketData(data.rocket.rocket_id)

    // open launch detail modal
    // using refBtnOpenModal
    this.refBtnOpenModal.current.click()
  }

  render() {
    return (
      <TableDataView
        {...this.props}
        {...this.state}
        refBtnOpenModal={this.refBtnOpenModal}
        openLaunchDetailModal={this.openLaunchDetailModal}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  launch: state.launch
})

const mapDispatchToProps = {
  getRocketData
}

TableDataContainer.propTypes = {
  launch: propTypes.object,
  getRocketData: propTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDataContainer)
