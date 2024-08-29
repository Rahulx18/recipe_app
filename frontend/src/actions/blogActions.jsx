import axios from "axios";
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
} from "../constants";
const API_URL = process.env.REACT_APP_API_URL;
export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_URL}/blogs`, config);
    dispatch({ type: FETCH_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_BLOGS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
