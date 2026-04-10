import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'
const CATEGORIES = ['Seafood', 'Pork', 'Beef', 'Chicken', 'Dessert']

// These are verified TheMealDB IDs for Filipino-style or Filipino dishes
const FILIPINO_IDS = [
  '52772', // Chicken Adobo
  '52854', // Sinigang
  '53049', // Kare-Kare
  '52820', // Chicken & Mushroom Hotpot (close match)
  '52959', // Leche Flan
  '53000', // Buko Pandan
]

const CHEESE_SAUCE_RECIPE = {
  idMeal: 'filipino-bonus-001',
  strMeal: 'Cheese Sauce',
  strCategory: 'Filipino',
  strArea: 'BONUS',
  strMealThumb: 'https://www.allrecipes.com/thmb/WQXaZCz-G9VucvmfK6KT7Ftlziw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/75478-my-mother-in-laws-cheese-saucessshh-dont-tell-her-DDMFS-Beauty-4x3-1127441eb4654b85ae85323d6b31fe0c.jpg',
  strInstructions:
    'Melt butter in a saucepan over medium heat.\n' +
    'Add flour and whisk continuously for 1 minute to form a roux.\n' +
    'Gradually pour in the milk, whisking constantly to avoid lumps.\n' +
    'Continue stirring over medium heat until the sauce thickens, about 5 minutes.\n' +
    'Reduce heat to low and add the shredded cheese. Stir until fully melted and smooth.\n' +
    'Season with salt, pepper, and a pinch of paprika.\n' +
    'Serve warm over pasta, vegetables, nachos, or as a dipping sauce.',
  strIngredient1: 'Butter',             strMeasure1: '2 tbsp',
  strIngredient2: 'All-purpose flour',  strMeasure2: '2 tbsp',
  strIngredient3: 'Milk',               strMeasure3: '1 cup',
  strIngredient4: 'Cheddar Cheese',     strMeasure4: '1 cup shredded',
  strIngredient5: 'Salt',               strMeasure5: '1/2 tsp',
  strIngredient6: 'Black Pepper',       strMeasure6: '1/4 tsp',
  strIngredient7: 'Paprika',            strMeasure7: 'pinch',
  strYoutube: 'https://www.youtube.com/watch?v=h7FQYUZblIc',
}

const MANUAL_FILIPINO = [
  {
    idMeal: 'filipino-001',
    strMeal: 'Beef Caldereta',
    strCategory: 'Filipino',
    strArea: 'Beef',
    strMealThumb: 'https://www.seriouseats.com/thmb/Y0WUnGVqj4jHf3zWZ9PlmQ3iGsU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__20110114-goatstewcebu-primary_2-e88cf43a217b441581d6dfa2d345ca3f.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=7jyJZkVvyzo',
    strInstructions:
      'Heat oil in a large pot over medium-high heat. Brown the beef chunks on all sides, then set aside.\n' +
      'In the same pot, saute garlic and onions until soft.\n' +
      'Add tomato paste and cook for 2 minutes.\n' +
      'Return the beef to the pot. Pour in beef broth and bay leaves. Simmer for 45 minutes until beef is tender.\n' +
      'Add potatoes, carrots, and bell peppers. Simmer for another 15 minutes.\n' +
      'Stir in liver spread and green olives. Season with salt and pepper.\n' +
      'Simmer for 5 more minutes and serve hot with rice.',
    strIngredient1: 'Beef',          strMeasure1: '1 kg cubed',
    strIngredient2: 'Garlic',        strMeasure2: '5 cloves minced',
    strIngredient3: 'Onion',         strMeasure3: '1 large chopped',
    strIngredient4: 'Tomato Paste',  strMeasure4: '3 tbsp',
    strIngredient5: 'Beef Broth',    strMeasure5: '2 cups',
    strIngredient6: 'Potatoes',      strMeasure6: '2 medium cubed',
    strIngredient7: 'Carrots',       strMeasure7: '2 medium sliced',
    strIngredient8: 'Bell Pepper',   strMeasure8: '2 sliced',
    strIngredient9: 'Liver Spread',  strMeasure9: '1 can',
    strIngredient10: 'Green Olives', strMeasure10: '1/2 cup',
    strIngredient11: 'Bay Leaves',   strMeasure11: '3 pieces',
    strIngredient12: 'Salt',         strMeasure12: 'to taste',
    strIngredient13: 'Black Pepper', strMeasure13: 'to taste',
  },
  {
    idMeal: 'filipino-002',
    strMeal: 'Pork Adobo',
    strCategory: 'Filipino',
    strArea: 'Pork',
    strMealThumb: 'https://www.nestlegoodnes.com/ph/sites/default/files/styles/1_1_768px_width/public/srh_recipes/41d16b3eb7ce08aba9e9114f304f5d87.jpg.webp?itok=IzwghKEf',
    strYoutube: 'https://www.youtube.com/watch?v=RgkWGnUV62o',
    strInstructions:
      'Combine pork, soy sauce, vinegar, garlic, bay leaves, and peppercorns in a pot. Marinate for 30 minutes.\n' +
      'Bring to a boil over medium-high heat without stirring.\n' +
      'Lower heat and simmer for 30 minutes until pork is tender.\n' +
      'Remove pork from the sauce. Pan-fry in a little oil until lightly browned.\n' +
      'Return pork to the pot and simmer until sauce thickens.\n' +
      'Serve over steamed white rice.',
    strIngredient1: 'Pork Belly',       strMeasure1: '1 kg cut into pieces',
    strIngredient2: 'Soy Sauce',        strMeasure2: '1/2 cup',
    strIngredient3: 'White Vinegar',    strMeasure3: '1/2 cup',
    strIngredient4: 'Garlic',           strMeasure4: '8 cloves crushed',
    strIngredient5: 'Bay Leaves',       strMeasure5: '4 pieces',
    strIngredient6: 'Black Peppercorns',strMeasure6: '1 tsp',
    strIngredient7: 'Sugar',            strMeasure7: '1 tsp',
    strIngredient8: 'Oil',              strMeasure8: '2 tbsp',
  },
  {
    idMeal: 'filipino-003',
    strMeal: 'Sinigang na Baboy',
    strCategory: 'Filipino',
    strArea: 'Pork',
    strMealThumb: 'https://assets.unileversolutions.com/recipes-v3/214408-default.png?im=AspectCrop=(718,401);Resize=(718,401)',
    strYoutube: 'https://www.youtube.com/watch?v=GCo4fg_SiR4',
    strInstructions:
      'Boil pork ribs in water until tender, about 45 minutes. Skim off foam.\n' +
      'Add onion, tomatoes, and sinigang mix. Stir well.\n' +
      'Add taro (gabi) and cook for 10 minutes.\n' +
      'Add radish and string beans. Simmer for 5 minutes.\n' +
      'Add eggplant and kangkong. Cook for 3 more minutes.\n' +
      'Season with fish sauce to taste.\n' +
      'Serve hot with steamed rice and fish sauce on the side.',
    strIngredient1: 'Pork Ribs',    strMeasure1: '1 kg',
    strIngredient2: 'Sinigang Mix', strMeasure2: '1 packet',
    strIngredient3: 'Onion',        strMeasure3: '1 large quartered',
    strIngredient4: 'Tomatoes',     strMeasure4: '2 medium quartered',
    strIngredient5: 'Taro',         strMeasure5: '3 pieces peeled',
    strIngredient6: 'Radish',       strMeasure6: '1 medium sliced',
    strIngredient7: 'String Beans', strMeasure7: '1 cup',
    strIngredient8: 'Eggplant',     strMeasure8: '1 medium sliced',
    strIngredient9: 'Kangkong',     strMeasure9: '1 bunch',
    strIngredient10: 'Fish Sauce',  strMeasure10: 'to taste',
    strIngredient11: 'Water',       strMeasure11: '8 cups',
  },
  {
    idMeal: 'filipino-004',
    strMeal: 'Chicken Tinola',
    strCategory: 'Filipino',
    strArea: 'Chicken',
    strMealThumb: 'https://images.ctfassets.net/pxcfulgsd9e2/5AdDxxvnSrsaRFZtkI0yws/e68046e73433905178dee2a0909a45df/Chicken_Tinola_recipe_HN3483_Recipe_Cover_Sized.jpg?q=85&f=top&fit=fill&fm=webp&w=720&h=405',
    strYoutube: 'https://www.youtube.com/watch?v=ZnySXYxTToE',
    strInstructions:
      'Heat oil in a pot over medium heat. Saute ginger until fragrant.\n' +
      'Add onion and garlic, cook until soft.\n' +
      'Add chicken pieces and cook until lightly browned.\n' +
      'Pour in fish sauce and stir for 1 minute.\n' +
      'Add water or broth and bring to a boil. Simmer for 20 minutes.\n' +
      'Add green papaya wedges and cook for 10 minutes.\n' +
      'Add chili leaves or malunggay. Season with salt and pepper.\n' +
      'Serve hot with rice.',
    strIngredient1: 'Chicken',       strMeasure1: '1 kg cut into pieces',
    strIngredient2: 'Ginger',        strMeasure2: '2 inch piece sliced',
    strIngredient3: 'Garlic',        strMeasure3: '4 cloves minced',
    strIngredient4: 'Onion',         strMeasure4: '1 medium sliced',
    strIngredient5: 'Green Papaya',  strMeasure5: '1 small wedged',
    strIngredient6: 'Chili Leaves',  strMeasure6: '1 cup',
    strIngredient7: 'Fish Sauce',    strMeasure7: '2 tbsp',
    strIngredient8: 'Water',         strMeasure8: '6 cups',
    strIngredient9: 'Salt',          strMeasure9: 'to taste',
    strIngredient10: 'Black Pepper', strMeasure10: 'to taste',
  },
  {
    idMeal: 'filipino-005',
    strMeal: 'Leche Flan',
    strCategory: 'Filipino',
    strArea: 'Dessert',
    strMealThumb: 'https://i0.wp.com/thenotsocreativecook.com/wp-content/uploads/2013/10/thenotsocreativecook-lecheflan3.jpg?w=768&ssl=1',
    strYoutube: 'https://www.youtube.com/watch?v=r-QQQHe0AjM',
    strInstructions:
      'Make the caramel: heat sugar in a llanera over low heat until it melts and turns golden amber. Swirl to coat the bottom. Set aside to cool.\n' +
      'In a bowl, combine egg yolks and condensed milk. Mix gently — do not whisk to avoid bubbles.\n' +
      'Add evaporated milk and vanilla extract. Stir to combine.\n' +
      'Strain the mixture through a fine sieve into the llanera.\n' +
      'Cover with aluminum foil. Steam over low heat for 35-40 minutes.\n' +
      'Let cool completely, then refrigerate for at least 2 hours.\n' +
      'To serve, run a knife around the edges and invert onto a plate.',
    strIngredient1: 'Egg Yolks',        strMeasure1: '10 pieces',
    strIngredient2: 'Condensed Milk',   strMeasure2: '1 can (300ml)',
    strIngredient3: 'Evaporated Milk',  strMeasure3: '1 can (370ml)',
    strIngredient4: 'Vanilla Extract',  strMeasure4: '1 tsp',
    strIngredient5: 'Sugar',            strMeasure5: '1 cup for caramel',
  },
  {
    idMeal: 'filipino-006',
    strMeal: 'Buko Salad',
    strCategory: 'Filipino',
    strArea: 'Dessert',
    strMealThumb: 'https://panlasangpinoy.com/wp-content/uploads/2014/11/Buko-Salad1.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=EBCFcZkhJdE',
    strInstructions:
      'Drain all canned fruits and set aside.\n' +
      'In a large bowl, combine young coconut strips, nata de coco, kaong, and drained fruit cocktail.\n' +
      'Add cream cheese and all-purpose cream. Mix gently until well combined.\n' +
      'Fold in condensed milk to sweeten to taste.\n' +
      'Chill in the refrigerator for at least 1 hour before serving.\n' +
      'Serve cold as a dessert or side dish.',
    strIngredient1: 'Young Coconut Strips', strMeasure1: '2 cups',
    strIngredient2: 'Nata de Coco',         strMeasure2: '1 cup drained',
    strIngredient3: 'Kaong',                strMeasure3: '1 cup drained',
    strIngredient4: 'Fruit Cocktail',       strMeasure4: '1 can drained',
    strIngredient5: 'All-purpose Cream',    strMeasure5: '1 cup',
    strIngredient6: 'Cream Cheese',         strMeasure6: '250g softened',
    strIngredient7: 'Condensed Milk',       strMeasure7: '3 tbsp',
  },
  {
    idMeal: 'filipino-007',
    strMeal: 'Pancit Canton',
    strCategory: 'Filipino',
    strArea: 'Noodles',
    strMealThumb: 'https://images.yummy.ph/yummy/uploads/2020/06/KNR_0072-1.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=DgWaopWKn-U',
    strInstructions:
      'Soak pancit canton noodles in warm water for 5 minutes. Drain and set aside.\n' +
      'Heat oil in a wok or large pan. Saute garlic and onion until fragrant.\n' +
      'Add chicken strips and shrimp. Cook until done.\n' +
      'Add cabbage, carrots, and snap peas. Stir fry for 2 minutes.\n' +
      'Add soy sauce, oyster sauce, and chicken broth. Stir to combine.\n' +
      'Add the drained noodles. Toss everything together until noodles are cooked through.\n' +
      'Season with salt and pepper. Serve with calamansi on the side.',
    strIngredient1: 'Pancit Canton Noodles', strMeasure1: '250g',
    strIngredient2: 'Chicken Breast',        strMeasure2: '200g sliced',
    strIngredient3: 'Shrimp',               strMeasure3: '150g peeled',
    strIngredient4: 'Cabbage',              strMeasure4: '2 cups shredded',
    strIngredient5: 'Carrots',              strMeasure5: '1 medium julienned',
    strIngredient6: 'Snap Peas',            strMeasure6: '1 cup',
    strIngredient7: 'Garlic',               strMeasure7: '4 cloves minced',
    strIngredient8: 'Onion',               strMeasure8: '1 medium sliced',
    strIngredient9: 'Soy Sauce',            strMeasure9: '3 tbsp',
    strIngredient10: 'Oyster Sauce',        strMeasure10: '2 tbsp',
    strIngredient11: 'Chicken Broth',       strMeasure11: '1 cup',
    strIngredient12: 'Calamansi',           strMeasure12: '4 pieces',
  },
  CHEESE_SAUCE_RECIPE,
]

const applyFiltersAndSort = (meals, searchQuery, sortOption, activeCategory) => {
  let result = [...meals]
  if (activeCategory && activeCategory !== 'All') {
    result = result.filter(m => m.strCategory === activeCategory)
  }
  if (searchQuery) {
    result = result.filter(m =>
      m.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  if (sortOption === 'az') result.sort((a, b) => a.strMeal.localeCompare(b.strMeal))
  else if (sortOption === 'za') result.sort((a, b) => b.strMeal.localeCompare(a.strMeal))
  return result
}

export const fetchAllRecipes = createAsyncThunk('recipes/fetchAllRecipes', async () => {
  const results = await Promise.all(
    CATEGORIES.map(cat =>
      fetch(`${BASE_URL}/filter.php?c=${cat}`)
        .then(r => r.json())
        .then(data => (data.meals || []).map(m => ({ ...m, strCategory: cat })))
    )
  )
  return results.flat()
})

export const fetchFilipinoRecipes = createAsyncThunk('recipes/fetchFilipinoRecipes', async () => {
  return MANUAL_FILIPINO
})

export const fetchRecipeDetail = createAsyncThunk('recipes/fetchRecipeDetail', async (id) => {
  // Check if it's a manual Filipino recipe first
  const manual = MANUAL_FILIPINO.find(m => m.idMeal === id)
  if (manual) return manual
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data = await response.json()
  return data.meals[0]
})

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    meals: [],
    filipinoMeals: [],
    filteredMeals: [],
    selectedMeal: null,
    searchQuery: '',
    sortOption: 'default',
    activeCategory: 'All',
    currentPage: 1,
    mealsPerPage: 8,
    status: 'idle',
    filipinoStatus: 'idle',
    detailStatus: 'idle',
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1
      const all = [...state.meals, ...state.filipinoMeals]
      state.filteredMeals = applyFiltersAndSort(all, action.payload, state.sortOption, state.activeCategory)
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload
      state.currentPage = 1
      const all = [...state.meals, ...state.filipinoMeals]
      state.filteredMeals = applyFiltersAndSort(all, state.searchQuery, action.payload, state.activeCategory)
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
      state.currentPage = 1
      state.searchQuery = ''
      const all = [...state.meals, ...state.filipinoMeals]
      state.filteredMeals = applyFiltersAndSort(all, '', state.sortOption, action.payload)
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
      .addCase(fetchAllRecipes.pending, (state) => { state.status = 'loading' })
      .addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.meals = action.payload
        const all = [...action.payload, ...state.filipinoMeals]
        state.filteredMeals = applyFiltersAndSort(all, state.searchQuery, state.sortOption, state.activeCategory)
      })
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchFilipinoRecipes.pending, (state) => { state.filipinoStatus = 'loading' })
      .addCase(fetchFilipinoRecipes.fulfilled, (state, action) => {
        state.filipinoStatus = 'succeeded'
        state.filipinoMeals = action.payload
        const all = [...state.meals, ...action.payload]
        state.filteredMeals = applyFiltersAndSort(all, state.searchQuery, state.sortOption, state.activeCategory)
      })
      .addCase(fetchFilipinoRecipes.rejected, (state, action) => {
        state.filipinoStatus = 'failed'
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

export const {
  setSearchQuery, setSortOption, setActiveCategory,
  setCurrentPage, clearSelectedMeal
} = recipeSlice.actions

export default recipeSlice.reducer