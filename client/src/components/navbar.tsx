import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Workout Hub</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav mr-auto">
            <div className="nav-item">
              <Link className="nav-link" to="/workouts">
                <i className="fas fa-user-circle"></i> Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar