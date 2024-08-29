import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const searchQuery = (query) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_REQUEST" });

    const { data } = await axios.get(`${API_URL}/search?q=${query}`);

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
