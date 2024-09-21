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
    videos: videoReducer, // Now handles both videoList and videoDetails
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
    videos: {
      videoList: {
        videos: [],
        loading: false,
        error: null,
      },
      videoDetails: {
        video: null,
        loading: false,
        error: null,
      },
      createVideo: {
        loading: false,
        success: false,
        error: null,
      },
    },
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
