import axios from "axios";
import {
  GET_ERRORS,
  SHOW_DOGS,
  SHOW_MATCHES
} from "./types";

export const showDogs = dogData => async (dispatch) => {
  try {
    const res = await axios.get("/api/dogs/show", {
      params: {
        username: dogData.username
      }
    });
    const data = res.data;
    dispatch(showDog(data));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const like = likeData => async (dispatch) => {
  try {
    const res = await axios.post("/api/dogs/like", likeData);
    return res.data;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const dislike = dislikeData => async (dispatch) => {
  try {
    await axios.post("/api/dogs/dislike", dislikeData);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const showMatches = dogData => async (dispatch) => {
  try {
    const res = await axios.get("/api/dogs/matches", {
      params: {
        username: dogData.username
      }
    });
    const data = res.data;
    dispatch(showMatch(data));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const showDog = (data) => {
  return {
    type: SHOW_DOGS,
    payload: data,
  };
};

export const showMatch = (data) => {
  return {
    type: SHOW_MATCHES,
    payload: data,
  };
};

export const addImage = (data) => async (dispatch) => {
  try {
    await axios.post("/api/dogs/image", data);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};