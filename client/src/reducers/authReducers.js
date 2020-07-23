import {
  SET_CURRENT_DOG,
  DOG_LOADING
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  dog: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_DOG:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        dog: action.payload
      };
    case DOG_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}