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
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
