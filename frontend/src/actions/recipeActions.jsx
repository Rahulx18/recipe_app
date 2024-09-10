import axios from "axios";
import {
  CREATE_RECIPE_FAILURE,
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
  FETCH_RECIPES_FAILURE,
} from "../constants";
import { FETCH_RECIPES_SUCCESS } from "../constants";
import { FETCH_RECIPES_REQUEST } from "../constants";
const API_URL = import.meta.env.VITE_PROD_URL;
export const fetchRecipes = () => async (dispatch) => {
  dispatch({ type: FETCH_RECIPES_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API_URL}/recipes`, config);

    dispatch({
      type: FETCH_RECIPES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RECIPES_FAILURE,
      payload: error.message,
    });
  }
};

export const createRecipe = (recipeData) => async (dispatch, getState) => {
  dispatch({ type: "CREATE_RECIPE_REQUEST" });

  try {
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
      `${API_URL}/recipes/create`,
      recipeData,
      config
    );

    dispatch({
      type: "CREATE_RECIPE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_RECIPE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
