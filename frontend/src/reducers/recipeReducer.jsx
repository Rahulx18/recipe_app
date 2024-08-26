import { FETCH_RECIPES_FAILURE } from "../constants";
import { FETCH_RECIPES_SUCCESS } from "../constants";
import { FETCH_RECIPES_REQUEST } from "../constants";

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
      return { ...state, loading: true };
    case FETCH_RECIPES_SUCCESS:
      return { ...state, loading: false, recipes: action.payload };
    case FETCH_RECIPES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default recipeReducer;
