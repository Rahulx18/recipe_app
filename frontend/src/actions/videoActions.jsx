import axios from "axios";
import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from "../constants/";
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
