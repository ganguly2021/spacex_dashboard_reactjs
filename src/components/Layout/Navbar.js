import React from 'react'
import { Link } from 'react-router-dom'

function reloadPage(){
  setTimeout(function(){
    window.location.reload()
  }, 100)
}

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
      <div className="container-fluid">
        <Link className="navbar-brand mx-auto" to="/" onClick={reloadPage}>
          <img 
          alt="spacex logo" 
          width="300" 
          height="50" 
          src="assets/img/spacex_logo.png"
          className="ms-md-5 ps-md-5 ms-0 ps-0"
          />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
