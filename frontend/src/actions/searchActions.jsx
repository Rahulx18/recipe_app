import axios from "axios";

export const searchQuery = (query) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_REQUEST" });

    const { data } = await axios.get(
      `http://localhost:3000/api/search?q=${query}`
    );

    dispatch({
      type: "SEARCH_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SEARCH_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
