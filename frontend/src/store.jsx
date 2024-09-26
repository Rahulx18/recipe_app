import { configureStore } from "@reduxjs/toolkit";
import blogListReducer from "./reducers/blogReducer";
import { searchReducer } from "./reducers/searchReducer";
import recipeReducer from "./reducers/recipeReducer";
import videoReducer from "./reducers/videoReducer";
import authReducer from "./reducers/authReducer";
import commentReducer from "./reducers/commentReducer";

const store = configureStore({
  reducer: {
    blogList: blogListReducer,
    search: searchReducer,
    recipeList: recipeReducer,
    videoList: videoReducer,
    auth: authReducer,
    comments: commentReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
