import { useNavigate } from 'react-router-dom'

function RecipeCard({ meal }) {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/recipe/${meal.idMeal}`)} style={{ cursor: 'pointer' }}>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
      <h3>{meal.strMeal}</h3>
    </div>
  )
}

export default RecipeCard