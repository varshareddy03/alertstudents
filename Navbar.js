import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-success'>
      <ul className="nav p-2 mt-2">
        <li className="nav-item ">
          <Link className="nav-link text-light" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/login">
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/opportunities">
            Opportunities
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default Navbar;