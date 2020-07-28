import { SHOW_DOGS } from "../actions/types";
const initState = {
  dogs: []
};

const dogReducer = (state = initState, action) => {
  switch(action.type) {
    case SHOW_DOGS:
      return {
        ...state, 
        dogs: action.payload
      };
      default:
        return state;
    }
  }

export default dogReducer;