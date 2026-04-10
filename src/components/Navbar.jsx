import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import { setActiveCategory } from '../store/slices/recipeSlice'
import './Navbar.css'

const NAV_CATEGORIES = [
  { value: 'All', label: 'All' },
  { value: 'Seafood', label: 'Seafood' },
  { value: 'Pork', label: 'Pork' },
  { value: 'Beef', label: 'Beef' },
  { value: 'Chicken', label: 'Chicken' },
  { value: 'Dessert', label: 'Dessert' },
  { value: 'Filipino', label: 'Filipino Classics' },
]

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, signOut } = useAuth()

  const handleCategory = (cat) => {
    dispatch(setActiveCategory(cat))
    navigate('/home')
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="navbar-logo">Bulldog Bites</span>
        </div>
        <div className="navbar-links">
          {NAV_CATEGORIES.map(cat => (
            <span key={cat.value} className="navbar-link" onClick={() => handleCategory(cat.value)}>
              {cat.label}
            </span>
          ))}
        </div>
        <div className="navbar-auth">
          {user ? (
            <>
              <button className="btn btn-primary navbar-add-btn" onClick={() => navigate('/add-recipe')}>
                Add Recipe
              </button>
              <span className="navbar-username">
                {user.user_metadata?.username || user.email.split('@')[0]}
              </span>
              <button className="btn btn-outline navbar-signout" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline navbar-auth-btn" onClick={() => navigate('/login')}>
                Sign In
              </button>
              <button className="btn btn-primary navbar-auth-btn" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar