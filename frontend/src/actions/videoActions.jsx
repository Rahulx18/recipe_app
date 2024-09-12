import axios from "axios";
import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  CREATE_VIDEO_FAILURE,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_REQUEST,
} from "../constants";
const API_URL = import.meta.env.VITE_PROD_URL;
export const fetchVideos = () => async (dispatch) => {
  dispatch({ type: FETCH_VIDEOS_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_URL}/videos`, config);

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

export const createVideo = (videoData) => async (dispatch, getState) => {
  try {
    console.log("Create req");
    dispatch({ type: "VIDEO_CREATE_REQUEST" });

    const {
      auth: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error("Not authenticated");
    }

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

    dispatch({ type: "VIDEO_CREATE_SUCCESS", payload: data });
    console.log("create success", data);
  } catch (error) {
    dispatch({
      type: "VIDEO_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
