import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
} from "../constants";

const initialState = {
  recipes: [],
  loading: false,
  error: null,
  createdRecipe: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Recipes Cases
    case FETCH_RECIPES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_RECIPES_SUCCESS:
      return { ...state, loading: false, recipes: action.payload };
    case FETCH_RECIPES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Create Recipe Cases
    case CREATE_RECIPE_REQUEST:
      return { ...state, loading: true, error: null, createdRecipe: null };
    case CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        createdRecipe: action.payload,
        recipes: [action.payload, ...state.recipes], // Add the new recipe to the existing list
      };
    case CREATE_RECIPE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default recipeReducer;
