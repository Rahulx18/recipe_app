import axios from "axios";
import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../constants";

const API_URL = import.meta.env.VITE_PROD_URL;

// Fetch comments
export const fetchComments = (id, type) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${API_URL}/comments/${id}/${type}`,
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

// Add a comment (only for logged-in users)
export const addComment =
  (id, type, commentData) => async (dispatch, getState) => {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const {
      auth: { userInfo },
    } = getState();

    if (!userInfo) {
      dispatch({
        type: ADD_COMMENT_FAILURE,
        payload: "You must be logged in to comment.",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/comments/${id}/${type}`,
        commentData,
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

// Delete a comment (only for the owner of the comment)
export const deleteComment = (commentId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_COMMENT_REQUEST });

  const {
    auth: { userInfo },
  } = getState();

  if (!userInfo) {
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      payload: "You must be logged in to delete comments.",
    });
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${API_URL}/comments/${commentId}`, config);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: commentId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
