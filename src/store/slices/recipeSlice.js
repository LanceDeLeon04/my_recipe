import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await fetch(`${BASE_URL}/filter.php?c=Seafood`)
  const data = await response.json()
  return data.meals
})

export const fetchRecipeDetail = createAsyncThunk('recipes/fetchRecipeDetail', async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data = await response.json()
  return data.meals[0]
})

const applyFiltersAndSort = (meals, searchQuery, sortOption) => {
  let result = [...meals]
  if (searchQuery) {
    result = result.filter(meal =>
      meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  if (sortOption === 'az') result.sort((a, b) => a.strMeal.localeCompare(b.strMeal))
  else if (sortOption === 'za') result.sort((a, b) => b.strMeal.localeCompare(a.strMeal))
  return result
}

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    meals: [],
    filteredMeals: [],
    selectedMeal: null,
    searchQuery: '',
    sortOption: 'default',
    currentPage: 1,
    mealsPerPage: 8,
    status: 'idle',
    detailStatus: 'idle',
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1
      state.filteredMeals = applyFiltersAndSort(state.meals, action.payload, state.sortOption)
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload
      state.currentPage = 1
      state.filteredMeals = applyFiltersAndSort(state.meals, state.searchQuery, action.payload)
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearSelectedMeal: (state) => {
      state.selectedMeal = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => { state.status = 'loading' })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.meals = action.payload
        state.filteredMeals = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchRecipeDetail.pending, (state) => { state.detailStatus = 'loading' })
      .addCase(fetchRecipeDetail.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selectedMeal = action.payload
      })
      .addCase(fetchRecipeDetail.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setSearchQuery, setSortOption, setCurrentPage, clearSelectedMeal } = recipeSlice.actions
export default recipeSlice.reducer