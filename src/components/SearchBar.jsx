import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../store/slices/recipeSlice'

function SearchBar() {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.recipes.searchQuery)

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  )
}

export default SearchBar