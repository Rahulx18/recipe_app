import { SEARCH_FAIL, SEARCH_SUCCESS, SEARCH_REQUEST } from "../constants";

const initialState = {
  results: { recipes: [], blogs: [], videos: [] },
  loading: false,
  error: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, results: action.payload, error: null };
    case SEARCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
