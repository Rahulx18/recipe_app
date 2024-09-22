// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import blogListReducer from "./reducers/blogReducer";
import { searchReducer } from "./reducers/searchReducer";
import recipeReducer from "./reducers/recipeReducer";
import videoReducer from "./reducers/videoReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    blogList: blogListReducer,
    search: searchReducer,
    recipeList: recipeReducer,
    videoList: videoReducer,
    auth: authReducer,
  },
  preloadedState: {
    blogList: {
      blogs: [],
      loading: false,
      error: null,
    },
    search: {
      results: { recipes: [], blogs: [], videos: [] },
      loading: false,
      error: null,
    },
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
