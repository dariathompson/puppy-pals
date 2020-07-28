import axios from "axios";
import {
  GET_ERRORS
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
      console.log("Received dogs");
      console.log(data);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}