import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

function updateURLParams(number, location, history) {
  let params = new URLSearchParams(location.search)

  // ..../?p=5 => p = page number
  // check url already has p
  if (params.has("p")) {
    if (number !== 1) {
      params.set("p", number)
    } else {
      params.delete("p")
    }
  } else {
    if (number !== 1) {
      params.append("p", number)
    } else {
      params.delete("p")
    }
  }

  // push new url to address bar
  history.push(`/?${params.toString()}`)
}

function Pagination(props) {

  const {
    launch,
    updatePaginationIndex,
    location,
    history
  } = props

  // hooks setup
  const [currentPage, setCurrentPage] = useState(1)

  // Array button to shown at bottom of page
  const [arrOfBtn, setArrOfBtn] = useState([])

  // size of data array in launch reducer
  const dataLength = launch.data.length
  const rowsPerPage = 12
  const totalPages = Math.ceil(dataLength / rowsPerPage)

  // page number shown on
  // pagination button
  const pageNumber = []

  for (let index = 1; index <= totalPages; index++) {
    pageNumber.push(index)
  }


  // useEffect hook to be called on componentDidMount
  useEffect(() => {
    // take value from URL if provided then update hook state
    let params = new URLSearchParams(location.search)

    if (params.has("p")) {
      // get page number from url
      let p = parseInt(params.get("p"))

      // check page in url is in pageNumber array
      if (pageNumber.indexOf(p) !== -1 && p > 1) {
        // calculate the start & end index
        const endIndex = p * rowsPerPage
        const startIndex = endIndex - rowsPerPage

        // update launch reducer indexes
        updatePaginationIndex({ startIndex: startIndex, endIndex: endIndex })

        // update hook state
        setCurrentPage(p)
      } else {
        // delete wrong p data from URL
        params.delete("p")

        // update url
        history.push(`/?${params.toString()}`)
      }
    }
  }, [])

  useEffect(() => {

    let tempNumberOfPages = [...arrOfBtn]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'

    if (pageNumber.length < 6) {
      tempNumberOfPages = pageNumber

    } else if (currentPage >= 1 && currentPage <= 3) {
      // tempPageNumbers represent the buttons
      // in pagination [1, 2, 3, 4, ..., 10] totalPages = 10
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, pageNumber.length]

    } else if (currentPage === 4) {
      const sliced = pageNumber.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, pageNumber.length]

    } else if (currentPage > 4 && currentPage < pageNumber.length - 2) {
      const sliced1 = pageNumber.slice(currentPage - 2, currentPage)
      const sliced2 = pageNumber.slice(currentPage, currentPage + 1)
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pageNumber.length])

    } else if (currentPage > pageNumber.length - 3) {
      const sliced = pageNumber.slice(pageNumber.length - 4)
      tempNumberOfPages = ([1, dotsLeft, ...sliced])

    } else if (currentPage === dotsInitial) {
      // if use clicks on '...' this button
      // then set currentPage number from arrOfBtn array
      goToPageNumber(arrOfBtn[arrOfBtn.length - 3] + 1)

    } else if (currentPage === dotsRight) {
      // if use clicks on '... ' this button
      // then set currentPage number from arrOfBtn array
      goToPageNumber(arrOfBtn[3] + 2)

    } else if (currentPage === dotsLeft) {
      // if use clicks on ' ...' this button
      // then set currentPage number from arrOfBtn array
      goToPageNumber(arrOfBtn[3] - 2)
    }

    // set arrOfBtn hook
    // arrOfBtn array is used to create pagination buttons
    // looks like this [1, 2, 3, 4, ..., 10]
    // or [1, ... , 5, 6, 7, ..., 10]
    setArrOfBtn(tempNumberOfPages)

  }, [currentPage])


  // functions to handle pagination movement
  function goToNextPage() {
    // calculate the start & end index
    const cp = currentPage + 1
    const endIndex = cp * rowsPerPage
    const startIndex = endIndex - rowsPerPage

    // update launch reducer indexes
    updatePaginationIndex({ startIndex: startIndex, endIndex: endIndex })

    // update url
    updateURLParams((currentPage + 1), location, history)

    // update hook state
    setCurrentPage(page => page + 1)
  }

  function goToPreviousPage() {
    // calculate the start & end index
    const cp = currentPage - 1
    const endIndex = cp * rowsPerPage
    const startIndex = endIndex - rowsPerPage

    // update launch reducer indexes
    updatePaginationIndex({ startIndex: startIndex, endIndex: endIndex })

    // update url
    updateURLParams((currentPage - 1), location, history)

    // update currentPage State
    setCurrentPage(page => page - 1)
  }

  function goToPageNumber(number) {

    // if user click on ... button
    if ((number === '...') || (number === '... ') || (number === ' ...')) {
      setCurrentPage(number)
      return;
    }

    // calculate the start & end index
    const endIndex = number * rowsPerPage
    const startIndex = endIndex - rowsPerPage

    // update launch reducer indexes
    updatePaginationIndex({ startIndex: startIndex, endIndex: endIndex })

    // update url
    updateURLParams(number, location, history)

    // update currentPage State
    setCurrentPage(number)
  }

  return (
    <nav aria-label="Page navigation example" className="float-end">
      <ul className="pagination pagination-sm">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`} >
          <button className="page-link" onClick={goToPreviousPage}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>
        {
          arrOfBtn.map(number => {
            return (
              <li className={`page-item ${currentPage === number ? "active" : ""}`} key={Math.random()} onClick={() => goToPageNumber(number)}>
                <button className="page-link">{number}</button>
              </li>
            )
          })
        }
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={goToNextPage}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  launch: propTypes.object,
  updatePaginationIndex: propTypes.func,
  location: propTypes.object,
  history: propTypes.object
}


export default withRouter(Pagination)
