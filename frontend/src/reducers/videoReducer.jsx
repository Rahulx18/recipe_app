import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  FETCH_SINGLE_VIDEO_REQUEST,
  FETCH_SINGLE_VIDEO_SUCCESS,
  FETCH_SINGLE_VIDEO_FAILURE,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAILURE,
  RESET_VIDEO_CREATE,
} from "../constants";

const initialState = {
  videos: [],
  singleVideo: null, // For storing a single video
  loading: false,
  error: null,
  success: false,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetching all videos
    case FETCH_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_VIDEOS_SUCCESS:
      return { ...state, loading: false, videos: action.payload, error: null };
    case FETCH_VIDEOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Fetching a single video
    case FETCH_SINGLE_VIDEO_REQUEST:
      return { ...state, loading: true };
    case FETCH_SINGLE_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        singleVideo: action.payload,
        error: null,
      };
    case FETCH_SINGLE_VIDEO_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Creating a video
    case CREATE_VIDEO_REQUEST:
      return { ...state, loading: true };
    case CREATE_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, action.payload],
        success: true,
        error: null,
      };
    case CREATE_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    // Resetting the video creation state
    case RESET_VIDEO_CREATE:
      return { ...state, success: false };

    default:
      return state;
  }
};

export default videoReducer;
