import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<><Navbar /><HomePage /></>} />
        <Route path="/recipe/:id" element={<><Navbar /><RecipeDetailPage /></>} />
      </Routes>
    </Router>
  )
}

export default App