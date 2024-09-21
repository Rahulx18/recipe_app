import axios from "axios";
import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAILURE,
  RESET_VIDEO_CREATE,
  FETCH_VIDEO_BY_ID_FAILURE,
  FETCH_VIDEO_BY_ID_SUCCESS,
  FETCH_VIDEO_BY_ID_REQUEST,
} from "../constants";

const API_URL = import.meta.env.VITE_PROD_URL;

export const fetchVideos = () => async (dispatch) => {
  dispatch({ type: FETCH_VIDEOS_REQUEST });

  try {
    const { data } = await axios.get(`${API_URL}/videos`);
    dispatch({ type: FETCH_VIDEOS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_VIDEOS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//
export const fetchVideoById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_VIDEO_BY_ID_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_URL}/videos/${id}`, config);
    console.log("single vid", data);
    dispatch({ type: FETCH_VIDEO_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_VIDEO_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//

export const createVideo = (videoData) => async (dispatch, getState) => {
  dispatch({ type: CREATE_VIDEO_REQUEST });

  const {
    auth: { userInfo },
  } = getState();

  if (!userInfo || !userInfo.token) {
    return dispatch({
      type: CREATE_VIDEO_FAILURE,
      payload: "Not authenticated",
    });
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${API_URL}/videos/create`,
      videoData,
      config
    );
    dispatch({ type: CREATE_VIDEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_VIDEO_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetVideoCreate = () => ({
  type: RESET_VIDEO_CREATE,
});
