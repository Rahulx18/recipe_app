import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAILURE,
} from "../constants";

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videoReducer = (
  state = { videos: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    // Fetch videos
    case FETCH_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_VIDEOS_SUCCESS:
      return { ...state, loading: false, videos: action.payload };
    case FETCH_VIDEOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Create video
    case CREATE_VIDEO_REQUEST:
      return { ...state, loading: true };
    case CREATE_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, action.payload], // Add newly created video
        success: true,
      };
    case CREATE_VIDEO_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default videoReducer;
