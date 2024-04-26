import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/HeaderStyles.css' // Import CSS file

const Header = () => {
  const [loginUser, setLoginUser] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setLoginUser(user)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('user')
    message.success('Logout successfully');
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img className='image' src='budget3.png' alt="Logo" />
          <Link className="navbar-brand" to="/">
            Track My Wallet
          </Link>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {" "}
              <p className="nav-link">{loginUser && loginUser.name}</p>{" "}
            </li>
            <li className="nav-item">
              <button className="btn logout-btn" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
