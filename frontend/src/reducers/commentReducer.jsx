import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../constants";

const initialState = {
  comments: [],
  loading: false,
  addingComment: false, // Separate loading state for adding comments
  deletingComment: false, // Separate loading state for deleting comments
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, loading: false, comments: action.payload };
    case FETCH_COMMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_COMMENT_REQUEST:
      return { ...state, addingComment: true };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addingComment: false,
        comments: [...state.comments, action.payload],
      };
    case ADD_COMMENT_FAILURE:
      return { ...state, addingComment: false, error: action.payload };

    case DELETE_COMMENT_REQUEST:
      return { ...state, deletingComment: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deletingComment: false,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    case DELETE_COMMENT_FAILURE:
      return { ...state, deletingComment: false, error: action.payload };

    default:
      return state;
  }
};

export default commentReducer;
