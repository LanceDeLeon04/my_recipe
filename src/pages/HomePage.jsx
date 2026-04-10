import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRecipes, fetchFilipinoRecipes, setCurrentPage } from '../store/slices/recipeSlice'
import RecipeCard from '../components/RecipeCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import './HomePage.css'

const HEADING_MAP = {
  All: 'All Recipes',
  Seafood: 'Seafood Recipes',
  Pork: 'Pork Recipes',
  Beef: 'Beef Recipes',
  Chicken: 'Chicken Recipes',
  Dessert: 'Dessert Recipes',
  Filipino: 'Filipino Classics',
}

function HomePage() {
  const dispatch = useDispatch()
  const {
    filteredMeals, status, filipinoStatus,
    currentPage, mealsPerPage, activeCategory
  } = useSelector(state => state.recipes)

  useEffect(() => {
    dispatch(fetchAllRecipes())
    dispatch(fetchFilipinoRecipes())
  }, [dispatch])

  const isLoading = status === 'loading' || filipinoStatus === 'loading'
  const isFailed = status === 'failed' || filipinoStatus === 'failed'

  const indexOfLast = currentPage * mealsPerPage
  const indexOfFirst = indexOfLast - mealsPerPage
  const currentMeals = filteredMeals.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage)
  const heading = HEADING_MAP[activeCategory] || 'All Recipes'

  return (
    <div className="homepage">
      <div className="homepage-hero">
        <div className="container">
          <h1 className="homepage-title">{heading}</h1>
          <p className="homepage-sub">Discover fresh, flavorful dishes from our collection</p>
        </div>
      </div>

      <div className="container homepage-body">
        <SearchBar />

        {isLoading && (
          <div className="homepage-state">
            <p>Loading recipes...</p>
          </div>
        )}

        {isFailed && (
          <div className="homepage-state">
            <p>Failed to load recipes. Please try again.</p>
          </div>
        )}

        {!isLoading && !isFailed && filteredMeals.length === 0 && (
          <div className="homepage-state">
            <p>No recipes found. Try a different search or category.</p>
          </div>
        )}

        {!isLoading && !isFailed && filteredMeals.length > 0 && (
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

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <span
            className="navbar-logo"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              color: 'var(--color-primary)'
            }}
          >
            Bulldog Bites
          </span>

          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              marginTop: '8px'
            }}
          >
            A project submitted to Mr. Jerwin Cruz by De Leon L. | Par | Pecho | Robles
          </p>

          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              marginTop: '8px'
            }}
          >
            Application Development Course | NU Laguna SCS
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage