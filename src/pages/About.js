import React from 'react'

const About = () => {
  return (
    <><div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
      
    </a>

    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
      <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
      <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
      <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
      <li><a href="#" class="nav-link px-2 text-white">About</a></li>
    </ul>

    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
    </form>

    <div class="text-end">
      <button type="button" class="btn btn-outline-light me-2">Login</button>
      <button type="button" class="btn btn-warning">Sign-up</button>
    </div>
  </div><div className='d-flex flex-wrap'>
      <div className='col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 bg-primary '>
      <h2>This is heading</h2>
    </div><div className='col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 bg-danger '>
        <h2>This is heading</h2>
      </div><div className='col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 bg-success '>
        <h2>This is heading</h2>
      </div><div className='col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3  bg-warning  '>
        <h2>This is heading</h2>
      </div>
      
      </div></>
  )
}

export default About