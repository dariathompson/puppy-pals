import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_DOG,
  DOG_LOADING
} from "./types";
// Register dog
export const registerDog = (dogData, history) => dispatch => {
  axios
    .post("/api/dogs/register", dogData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get dog token
export const loginDog = dogData => dispatch => {
  axios
    .post("/api/dogs/login", dogData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get dog data
      const decoded = jwt_decode(token);
      // Set current dog
      dispatch(setCurrentDog(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in dog
export const setCurrentDog = decoded => {
  return {
    type: SET_CURRENT_DOG,
    payload: decoded
  };
};
// dog loading
export const setDogLoading = () => {
  return {
    type: DOG_LOADING
  };
};
// Log dog out
export const logoutDog = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current dog to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentDog({}));
};