import React from 'react'

function Footer(props) {
  return (
    <div className="container-fluid p-5 bg-dark">
      <div className="container p-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <img
              alt="spacex logo"
              src="assets/img/spacex_logo.png"
              className="ms-md-5 ps-md-5 ms-0 ps-0 img-fluid"
            />
            <p className="text-white mt-3">&#169; 2021, All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
