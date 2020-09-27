import {
  GET_TECHS,
  ADD_TECH,
  SET_LOADING,
  TECHS_ERROR,
  DELETE_TECH,
} from "./types";

// Get techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/techs");
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: TECHS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Add tech to the server
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: TECHS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Delete techs from server
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`/techs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: TECHS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Set loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
