import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from "../constants";

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return { ...state, loading: true };

    case FETCH_VIDEOS_SUCCESS:
      return { ...state, loading: false, videos: action.payload };

    case FETCH_VIDEOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default videoReducer;
