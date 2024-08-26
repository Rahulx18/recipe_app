import axios from "axios";
import { FETCH_RECIPES_FAILURE } from "../constants";
import { FETCH_RECIPES_SUCCESS } from "../constants";
import { FETCH_RECIPES_REQUEST } from "../constants";

export const fetchRecipes = () => async (dispatch) => {
  dispatch({ type: FETCH_RECIPES_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:3000/api/recipes",
      config
    );

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
