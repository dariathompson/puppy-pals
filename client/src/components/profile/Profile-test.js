import React from "react";
import { shallow } from "enzyme";
// import rootReducer from "../../reducers/index";
// import { createStore } from "redux";
import configureStore from 'redux-mock-store';

import Profile from "./Profile";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

describe("Profile.js", () => {
  let logoutDog = jest.fn();
  let defaultProps;
  let store;

  beforeEach(() => {
    // defaultProps = {
    //     logoutDog,
    //     auth: {
    //         id: "1",
    //         name: "Rex",
    //         photo: "https://rex.jpg",
    //         age: "2",
    //         breed: "German Shepherd",
    //         username: "rex"
    //         // exp: 000,
    //         // iat: 111
    //     }
    // };
    store = mockStore({
        logoutDog,
        state:{
            auth: {
                id: "1",
                name: "Rex",
                photo: "https://rex.jpg",
                age: "2",
                breed: "German Shepherd",
                username: "rex",
                exp: '000',
                iat: '111'
            }
        }
        
    });
    
  });

  const setup = (props = {}) => {
    // const setupProps = { ...defaultProps, ...props };
    return shallow(<Provider store={store}><Profile /></Provider>);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const profileContainer = findTestByAttr(wrapper, "profile-container");

    expect(profileContainer.length).toBe(1);
  });
});

const findTestByAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
};

// const store = (initialState) => {
//     createStore(rootReducer, initialState);
//   };