import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './_Navbar.scss'
import {Link, useNavigate} from 'react-router-dom'
import {useUserContext} from '../hooks/useUserContext'
import { useLoadingContext } from '../context/LoadingContext'

const Navbar = () => {

  // useStates
  const [mobileNav, setMobileNav] = useState(false);

  // defines
  const navigate = useNavigate()

  // hooks
  const {isLoading, setIsLoading } = useLoadingContext()
  const {users, dispatch} = useUserContext()

  const handleMenu = () => {
    setMobileNav((prevState) => !prevState);
  }
  
  const handleLogout = () => {
    setMobileNav(false)
    setIsLoading(true);

    // Simulate the logout process (replace this with your actual logout logic)
    setTimeout(() => {
      localStorage.removeItem("users")
      dispatch({
        type: 'LOGOUT'
      });
      // Clear the user data or perform any necessary logout actions
      setIsLoading(false); // Hide loading state after logout
    }, 1500)
  }


  
  return ( 
    <div className='Navbar-container'>
      <div className="Navbar-wrapper">
        <header>
          <div className="logo">
            <h1>OwnTask</h1>
          </div>
          <button onClick={handleMenu}>      
            {mobileNav ? <i className="fa-solid fa-xmark fa-2x"></i> : <i className="fa-solid fa-bars fa-2x"></i>}
          </button>
        </header>

        <nav className={mobileNav ? "active-nav" : ""}>
          <ul>
            {users ? <h3>Welcome, {users.Name.includes(' ') ? users.Name.split(' ')[0] : users.Name}!</h3> : ''}
            <li>
              <Link to="/" className='anchor'>Home</Link>
            </li>
            <li>
              <Link className='anchor'>About Us</Link>
            </li>
            {users ? 
            <li>
              <Link onClick={handleLogout} className='anchor'>Logout</Link>
            </li>
            :
            <li>
              <Link to="/login"  className='anchor'>Login</Link>
            </li>}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar