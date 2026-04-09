import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Bulldog Bites 🐾</h1>
      <p>Your go-to recipe hub for fresh and delicious seafood meals.</p>
      <button onClick={() => navigate('/home')}>Explore Recipes</button>
    </div>
  )
}

export default LandingPage