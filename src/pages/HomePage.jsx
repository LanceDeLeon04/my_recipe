import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes, setCurrentPage } from '../store/slices/recipeSlice'
import RecipeCard from '../components/RecipeCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'

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
    <div>
      <SearchBar />
      {status === 'loading' && <p>Loading recipes...</p>}
      {status === 'failed' && <p>Failed to load recipes.</p>}
      {status === 'succeeded' && (
        <>
          <div>
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
  )
}

export default HomePage