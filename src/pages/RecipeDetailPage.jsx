import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchRecipeDetail, clearSelectedMeal } from '../store/slices/recipeSlice'

function RecipeDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedMeal, detailStatus } = useSelector(state => state.recipes)

  useEffect(() => {
    dispatch(fetchRecipeDetail(id))
    return () => dispatch(clearSelectedMeal())
  }, [dispatch, id])

  if (detailStatus === 'loading') return <p>Loading...</p>
  if (!selectedMeal) return <p>No recipe found.</p>

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = selectedMeal[`strIngredient${i}`]
    const measure = selectedMeal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`)
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/home')}>← Back</button>
      <h1>{selectedMeal.strMeal}</h1>
      <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} width="300" />
      <p><strong>Category:</strong> {selectedMeal.strCategory}</p>
      <p><strong>Area:</strong> {selectedMeal.strArea}</p>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <h3>Instructions</h3>
      {selectedMeal.strYoutube && (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${selectedMeal.strYoutube.split('v=')[1]}`}
    title={selectedMeal.strMeal}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
)}
    </div>
  )
}

export default RecipeDetailPage