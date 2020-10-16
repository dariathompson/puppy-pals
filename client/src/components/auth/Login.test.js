import React from "react";
import { shallow } from "enzyme";

import { Login } from "./Login";
import { findTestByAttr } from "../../testHelper"

describe("Login.js", () => {
    let loginDog = jest.fn();
    let defaultProps;
    beforeEach(() => {
      jest.clearAllMocks();
      defaultProps = {
        loginDog,
        errors: {},
        auth: {},
      };
    });

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Login {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const loginContainer = findTestByAttr(wrapper, "login-container");

    expect(loginContainer.length).toBe(1);
  });

  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("username input", () => {
      const usernameInput = findTestByAttr(wrapper, "username-input");

      expect(usernameInput.length).toBe(1);
    });
    test("password input", () => {
      const passwordInput = findTestByAttr(wrapper, "password-input");

      expect(passwordInput.length).toBe(1);
    });
    test("submit button", () => {
      const submitButton = findTestByAttr(wrapper, "submit-button");

      expect(submitButton.length).toBe(1);
    });
  });

  describe("form functionality", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("filling in email triggers onChange", () => {
      let usernameInput = findTestByAttr(wrapper, "username-input");

      usernameInput.simulate("change", {
        target: { id: "username", value: "rex" },
      });

      usernameInput = findTestByAttr(wrapper, "username-input");

      expect(usernameInput.props().value).toBe("rex");
    });
    test("filling in password triggers onChange", () => {
      let passwordInput = findTestByAttr(wrapper, "password-input");

      passwordInput.simulate("change", {
        target: { id: "password", value: "secret" },
      });

      passwordInput = findTestByAttr(wrapper, "password-input");

      expect(passwordInput.props().value).toBe("secret");
    });
  });

});
