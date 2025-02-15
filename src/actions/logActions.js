import {
  SET_LOADING,
  GET_LOGS,
  LOGS_ERROR,
  ADD_LOGS,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./types";

// Get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Add new log
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOGS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Update new log
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Delete Log
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Search logs from server
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LOGS_ERROR,
      payload: e.response.statusText,
    });
  }
};

// Set Current
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear Current
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
