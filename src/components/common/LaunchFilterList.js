import React from 'react'
import propTypes from 'prop-types'

function LaunchFilterList(props) {

  // Destructing props
  const {
    filterChange,
    currrentFilter,
    filterType
  } = props

  // create filter list
  const filterList = filterType.map((type, index) => {
    return (
      <li key={index}>
        <button
          className={`dropdown-item ${currrentFilter === index ? 'active' : ''}`}
          onClick={(e) => filterChange(e, index)}
        >{type}
        </button>
      </li>
    )
  })

  return (
    <div className="btn-group">
      <button className="btn shadow-sm p-2 mb-5 bg-body rounded" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fas fa-filter"></i> {filterType[currrentFilter]} <i className="fas fa-caret-down"></i>
      </button>
      <ul className="dropdown-menu">
        {filterList}
      </ul>
    </div>
  )
}

LaunchFilterList.propTypes = {
  filterChange: propTypes.func,
  currrentFilter: propTypes.number,
  filterType: propTypes.array
}

export default LaunchFilterList
