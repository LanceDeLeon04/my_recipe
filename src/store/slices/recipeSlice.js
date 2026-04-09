import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// Fetch all seafood recipes
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await fetch(`${BASE_URL}/filter.php?c=Seafood`)
  const data = await response.json()
  return data.meals
})

// Fetch single recipe detail by ID
export const fetchRecipeDetail = createAsyncThunk('recipes/fetchRecipeDetail', async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data = await response.json()
  return data.meals[0]
})

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    meals: [],
    filteredMeals: [],
    selectedMeal: null,
    searchQuery: '',
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
      state.filteredMeals = state.meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(action.payload.toLowerCase())
      )
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
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.meals = action.payload
        state.filteredMeals = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchRecipeDetail.pending, (state) => {
        state.detailStatus = 'loading'
      })
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

export const { setSearchQuery, setCurrentPage, clearSelectedMeal } = recipeSlice.actions
export default recipeSlice.reducer