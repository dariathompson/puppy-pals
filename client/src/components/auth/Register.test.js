import React from "react";
import { shallow } from "enzyme";

import { Register } from "./Register";

describe("Register.js", () => {
    let registerDog = jest.fn();
    let defaultProps;
    beforeEach(() => {
      jest.clearAllMocks();
      defaultProps = {
        registerDog,
        errors: {},
        auth: {
        },
      };
    });

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Register {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const registerContainer = findTestByAttr(wrapper, "register-container");

    expect(registerContainer.length).toBe(1);
  });

  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    test("name input", () => {
      const nameInput = findTestByAttr(wrapper, "name-input");

      expect(nameInput.length).toBe(1);
    });
    test("username input", () => {
      const usernameInput = findTestByAttr(wrapper, "username-input");

      expect(usernameInput.length).toBe(1);
    });
    test("age input", () => {
      const ageInput = findTestByAttr(wrapper, "age-input");

      expect(ageInput.length).toBe(1);
    });
    test("breed input", () => {
      const breedInput = findTestByAttr(wrapper, "breed-input");

      expect(breedInput.length).toBe(1);
    });
    test("email input", () => {
      const emailInput = findTestByAttr(wrapper, "email-input");

      expect(emailInput.length).toBe(1);
    });
    test("password input", () => {
      const passwordInput = findTestByAttr(wrapper, "password-input");

      expect(passwordInput.length).toBe(1);
    });
    test("confirm password input", () => {
      const password2Input = findTestByAttr(wrapper, "password2-input");

      expect(password2Input.length).toBe(1);
    });
    test("submit button", () => {
      const submitButton = findTestByAttr(wrapper, "submit-button");

      expect(submitButton.length).toBe(1);
    });
  });
});

const findTestByAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
};