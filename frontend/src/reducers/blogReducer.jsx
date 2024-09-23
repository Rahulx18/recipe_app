import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  CREATE_BLOG_FAILURE,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_REQUEST,
  RESET_BLOG_CREATE,
  FETCH_SINGLE_BLOG_REQUEST,
  FETCH_SINGLE_BLOG_SUCCESS,
  FETCH_SINGLE_BLOG_FAILURE,
} from "../constants";

const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
  blogCreated: false,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all blogs
    case FETCH_BLOGS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };
    case FETCH_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Fetch a single blog
    case FETCH_SINGLE_BLOG_REQUEST:
      return { ...state, loading: true, blog: null }; // Reset single blog state when fetching
    case FETCH_SINGLE_BLOG_SUCCESS:
      return { ...state, loading: false, blog: action.payload };
    case FETCH_SINGLE_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Create blog
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

    // Reset blog creation status
    case RESET_BLOG_CREATE:
      return { ...state, blogCreated: false };

    default:
      return state;
  }
};

export default blogReducer;
