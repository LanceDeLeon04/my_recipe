import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
  const location = useLocation()
  const dispatch = useDispatch()

  const handleCategory = (cat) => {
    dispatch(setActiveCategory(cat))
    navigate('/home')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="navbar-logo">Bulldog Bites</span>
        </div>
        <div className="navbar-links">
          {NAV_CATEGORIES.map(cat => (
            <span
              key={cat.value}
              className="navbar-link"
              onClick={() => handleCategory(cat.value)}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar