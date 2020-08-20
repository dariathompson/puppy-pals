import { SHOW_DOGS, SHOW_MATCHES } from "../actions/types";
const initState = {
  dogs: [],
  matches: []
};

const dogReducer = (state = initState, action) => {
  switch(action.type) {
    case SHOW_DOGS:
      return {
        ...state, 
        dogs: action.payload
      };
    case SHOW_MATCHES:
      return {
        ...state, 
        matches: action.payload
      };
      default:
        return state;
    }
  }

export default dogReducer;