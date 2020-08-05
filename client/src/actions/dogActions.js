import axios from "axios";
import {
  GET_ERRORS,
  SHOW_DOGS
} from "./types";

export const showDogs = dogData => dispatch => {
  axios
    .get("/api/dogs/show", {
      params: {
        username: dogData.username
      }
    })
    .then((res) => {
      const data = res.data;
      dispatch(showDog(data))
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

export const like = likeData => dispatch => {
  axios
    .post("/api/dogs/like", likeData)
    .then(res => {console.log(res.status)})
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

export const showDog = (data) => {
  return {
    type: SHOW_DOGS,
    payload: data,
  };
};