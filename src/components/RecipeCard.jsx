import CommentsSection from '../components/CommentsSection'
import { useNavigate } from 'react-router-dom'
import './RecipeCard.css'

function RecipeCard({ meal }) {
  const navigate = useNavigate()

  const categoryLabel = meal.strCategory || 'Recipe'

  return (
    <div className="recipe-card" onClick={() => navigate(`/recipe/${meal.idMeal}`)}>
      <div className="recipe-card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-card-img" />
        <div className="recipe-card-img-overlay" />
        <span className="recipe-card-tag">{categoryLabel}</span>
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{meal.strMeal}</h3>
        <span className="recipe-card-link">View Recipe</span>
      </div>
    </div>
  )
}

export default RecipeCard