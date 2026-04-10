import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes, setCurrentPage } from '../store/slices/recipeSlice'
import RecipeCard from '../components/RecipeCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import './HomePage.css'

function HomePage() {
  const dispatch = useDispatch()
  const { filteredMeals, status, currentPage, mealsPerPage } = useSelector(state => state.recipes)

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch])

  const indexOfLast = currentPage * mealsPerPage
  const indexOfFirst = indexOfLast - mealsPerPage
  const currentMeals = filteredMeals.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage)

  return (
    <div className="homepage">
      <div className="homepage-hero">
        <div className="container">
          <h1 className="homepage-title">Seafood Recipes</h1>
          <p className="homepage-sub">Discover fresh, flavorful dishes from the sea</p>
        </div>
      </div>
      <div className="container homepage-body">
        <SearchBar />
        {status === 'loading' && (
          <div className="homepage-state">
            <p>Loading recipes...</p>
          </div>
        )}
        {status === 'failed' && (
          <div className="homepage-state">
            <p>Failed to load recipes. Please try again.</p>
          </div>
        )}
        {status === 'succeeded' && filteredMeals.length === 0 && (
          <div className="homepage-state">
            <p>No recipes found. Try a different search.</p>
          </div>
        )}
        {status === 'succeeded' && filteredMeals.length > 0 && (
          <>
            <p className="homepage-count">{filteredMeals.length} recipes found</p>
            <div className="recipes-grid">
              {currentMeals.map(meal => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => dispatch(setCurrentPage(page))}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage