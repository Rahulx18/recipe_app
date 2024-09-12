import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAILURE,
  RESET_VIDEO_CREATE,
} from "../constants";

const initialState = {
  videos: [],
  loading: false,
  error: null,
  success: false,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_VIDEOS_SUCCESS:
      return { ...state, loading: false, videos: action.payload };
    case FETCH_VIDEOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_VIDEO_REQUEST:
      return { ...state, loading: true };
    case CREATE_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, action.payload],
        success: true,
      };
    case CREATE_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case RESET_VIDEO_CREATE:
      return initialState;
    default:
      return state;
  }
};

export default videoReducer;
