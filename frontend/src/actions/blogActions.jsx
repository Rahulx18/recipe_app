import axios from "axios";
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAILURE,
} from "../constants";

const API_URL = import.meta.env.VITE_PROD_URL;

export const fetchBlogById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_URL}/blogs/${id}`, config);
    dispatch({ type: FETCH_BLOG_SUCCESS, payload: data });
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
export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });

  try {
    console.log(API_URL);
    console.log(`Fetching blogs from: ${API_URL}/blogs`); // Log the URL
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_URL}/blogs`, config);
    console.log("Fetched blogs data:", data); // Log the fetched data
    dispatch({ type: FETCH_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching blogs:", error); // Log the error
    dispatch({
      type: FETCH_BLOGS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  dispatch({ type: CREATE_BLOG_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/blogs/create`,
      blogData,
      config
    );

    dispatch({
      type: CREATE_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
