import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchRecipeDetail, clearSelectedMeal } from '../store/slices/recipeSlice'
import './RecipeDetailPage.css'

function RecipeDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedMeal, detailStatus } = useSelector(state => state.recipes)

  useEffect(() => {
    dispatch(fetchRecipeDetail(id))
    return () => dispatch(clearSelectedMeal())
  }, [dispatch, id])

  if (detailStatus === 'loading') {
    return (
      <div className="detail-state">
        <p>Loading recipe...</p>
      </div>
    )
  }

  if (!selectedMeal) {
    return (
      <div className="detail-state">
        <p>Recipe not found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/home')} style={{ marginTop: '16px' }}>
          Back to Recipes
        </button>
      </div>
    )
  }

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = selectedMeal[`strIngredient${i}`]
    const measure = selectedMeal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure: measure?.trim() || '' })
    }
  }

  const videoId = selectedMeal.strYoutube?.split('v=')[1]

  return (
    <div className="detail-page">
      <div className="detail-page-bg" />
      <div className="container detail-container">

        <button className="detail-back btn btn-outline" onClick={() => navigate('/home')}>
          Back to Recipes
        </button>

        <div className="detail-card">
          {/* Left: Media */}
          <div className="detail-left">
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="detail-photo"
            />
            {videoId && (
              <div className="detail-video-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={selectedMeal.strMeal}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="detail-video"
                />
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="detail-right">
            <div className="detail-tags">
              {selectedMeal.strCategory && <span className="tag">{selectedMeal.strCategory}</span>}
              {selectedMeal.strArea && <span className="tag">{selectedMeal.strArea}</span>}
            </div>
            <h1 className="detail-title">{selectedMeal.strMeal}</h1>

            <div className="detail-section">
              <h2 className="detail-section-title">Ingredients</h2>
              <ul className="ingredients-list">
                {ingredients.map((item, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-dot" />
                    <span className="ingredient-measure">{item.measure}</span>
                    <span className="ingredient-name">{item.ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">Instructions</h2>
              <div className="detail-instructions">
                {selectedMeal.strInstructions
                  .split('\n')
                  .filter(step => step.trim())
                  .map((step, index) => (
                    <p key={index} className="instruction-step">{step}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailPage