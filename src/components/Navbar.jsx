import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand" onClick={() => navigate('/home')}>
          <span className="navbar-logo">Bulldog Bites</span>
        </div>
        <div className="navbar-links">
          <span
            className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}
            onClick={() => navigate('/home')}
          >
            Recipes
          </span>
          <span
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            Home
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar