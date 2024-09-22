import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  CREATE_BLOG_FAILURE,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_REQUEST,
  RESET_BLOG_CREATE,
} from "../constants";
const initialState = {
  blogs: [],
  loading: false,
  error: null,
  blogCreated: false,
};
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };
    case FETCH_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_BLOG_REQUEST:
      return { ...state, loading: true };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.payload],
        blogCreated: true,
      };

    case CREATE_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_BLOG_CREATE:
      return { ...state, blogCreated: false };
    default:
      return state;
  }
};

export default blogReducer;
