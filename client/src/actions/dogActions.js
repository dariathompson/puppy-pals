import axios from "axios";
import {
  GET_ERRORS,
  SHOW_DOGS
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
    await axios.post("/api/dogs/like", likeData);
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

export const showDog = (data) => {
  return {
    type: SHOW_DOGS,
    payload: data,
  };
};