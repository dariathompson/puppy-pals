import React from "react";
import { shallow } from "enzyme";

import { Profile } from "./Profile";

describe("Profile.js", () => {
  let logoutDog = jest.fn();
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      logoutDog,
      auth: {
       dog: {
        id: "1",
        name: "Rex",
        photo: "https://rex.jpg",
        age: "2",
        breed: "German Shepherd",
        username: "rex",
       }
      }
    };
  });

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Profile {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  console.log("Heyy")
  console.log(wrapper)
  const profileContainer = findTestByAttr(wrapper, "profile-container");

  expect(profileContainer.length).toBe(1);
});

});


const findTestByAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
};




