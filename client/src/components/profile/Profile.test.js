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
    const profileContainer = findTestByAttr(wrapper, "profile-container");

    expect(profileContainer.length).toBe(1);
  });

  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("name", () => {
      const nameContainer = findTestByAttr(wrapper, "name-container");

      expect(nameContainer.length).toBe(1);
      expect(nameContainer.text()).toBe("Hey there, Rex");
    });
    test("breed", () => {
      const breedElement = findTestByAttr(wrapper, "breed-element");

      expect(breedElement.length).toBe(1);
      expect(breedElement.text()).toBe("breed: German Shepherd");
    });
    test("age", () => {
      const ageElement = findTestByAttr(wrapper, "age-element");

      expect(ageElement.length).toBe(1);
      expect(ageElement.text()).toBe("age: 2");
    });
    test("photo", () => {
      const photoContainer = findTestByAttr(wrapper, "photo-container");

      expect(photoContainer.length).toBe(1);
      expect(photoContainer.prop("src")).toEqual("https://rex.jpg");
    });
  });
});


const findTestByAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
};




