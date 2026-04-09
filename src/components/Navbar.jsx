import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav>
      <h2 onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        🐾 Bulldog Bites
      </h2>
    </nav>
  )
}

export default Navbar