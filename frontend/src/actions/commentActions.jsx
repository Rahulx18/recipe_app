import axios from "axios";
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../constants";

const API_URL = import.meta.env.VITE_PROD_URL;

// Function to fetch comments for a specific blog, recipe, or video by ID
export const fetchComments = (id, type) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Adjusted URL based on specified API structure
    const { data } = await axios.get(
      `${API_URL}/comments/${id}/${type}`, // Corrected URL format
      config
    );

    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Function to add a new comment for a specific blog, recipe, or video by ID
export const addComment =
  (id, type, commentData) => async (dispatch, getState) => {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const {
      auth: { userInfo },
    } = getState();

    // Add user field to commentData
    const dataToSend = {
      ...commentData,
      user: userInfo ? userInfo.name : "Anonymous",
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo ? `Bearer ${userInfo.token}` : undefined,
        },
      };

      // Adjusted URL based on specified API structure
      const { data } = await axios.post(
        `${API_URL}/comments/${id}/${type}`, // Corrected URL format
        dataToSend,
        config
      );

      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_COMMENT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
