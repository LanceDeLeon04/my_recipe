import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AddRecipePage from './pages/AddRecipePage'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<><Navbar /><HomePage /></>} />
        <Route path="/recipe/:id" element={<><Navbar /><RecipeDetailPage /></>} />
        <Route path="/login" element={<><Navbar /><LoginPage /></>} />
        <Route path="/signup" element={<><Navbar /><SignupPage /></>} />
        <Route path="/add-recipe" element={<><Navbar /><AddRecipePage /></>} />
      </Routes>
    </Router>
  )
}

export default App