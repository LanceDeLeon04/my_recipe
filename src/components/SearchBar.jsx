import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery, setSortOption } from '../store/slices/recipeSlice'
import './SearchBar.css'

function SearchBar() {
  const dispatch = useDispatch()
  const { searchQuery, sortOption } = useSelector(state => state.recipes)

  return (
    <div className="searchbar-wrap">
      <div className="searchbar-input-wrap">
        <svg className="searchbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search seafood recipes..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        {searchQuery && (
          <button className="searchbar-clear" onClick={() => dispatch(setSearchQuery(''))}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
      <select
        className="searchbar-sort"
        value={sortOption}
        onChange={(e) => dispatch(setSortOption(e.target.value))}
      >
        <option value="default">Sort: Default</option>
        <option value="az">Sort: A - Z</option>
        <option value="za">Sort: Z - A</option>
      </select>
    </div>
  )
}

export default SearchBar