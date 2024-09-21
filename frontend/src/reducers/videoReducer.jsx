import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  FETCH_VIDEO_BY_ID_REQUEST,
  FETCH_VIDEO_BY_ID_SUCCESS,
  FETCH_VIDEO_BY_ID_FAILURE,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAILURE,
  RESET_VIDEO_CREATE,
} from "../constants";

const initialState = {
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
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        videoList: { ...state.videoList, loading: true },
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videoList: { loading: false, videos: action.payload },
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        videoList: { loading: false, error: action.payload },
      };

    case FETCH_VIDEO_BY_ID_REQUEST:
      return {
        ...state,
        videoDetails: { ...state.videoDetails, loading: true },
      };
    case FETCH_VIDEO_BY_ID_SUCCESS:
      return {
        ...state,
        videoDetails: { loading: false, video: action.payload },
      };
    case FETCH_VIDEO_BY_ID_FAILURE:
      return {
        ...state,
        videoDetails: { loading: false, error: action.payload },
      };

    case CREATE_VIDEO_REQUEST:
      return {
        ...state,
        createVideo: { ...state.createVideo, loading: true },
      };
    case CREATE_VIDEO_SUCCESS:
      return {
        ...state,
        createVideo: { loading: false, success: true },
        videoList: {
          ...state.videoList,
          videos: [...state.videoList.videos, action.payload],
        },
      };
    case CREATE_VIDEO_FAILURE:
      return {
        ...state,
        createVideo: { loading: false, error: action.payload },
      };
    case RESET_VIDEO_CREATE:
      return {
        ...state,
        createVideo: { loading: false, success: false, error: null },
      };

    default:
      return state;
  }
};

export default videoReducer;
