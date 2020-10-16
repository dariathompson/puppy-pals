import React from "react";
import { shallow } from "enzyme";

import { Register } from "./Register";
import { findTestByAttr } from "../../testHelper"

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
  describe("form functionality", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("filling in username triggers onChange", () => {
      let usernameInput = findTestByAttr(wrapper, "username-input");

      usernameInput.simulate("change", {
        target: { id: "username", value: "rex" },
      });

      usernameInput = findTestByAttr(wrapper, "username-input");

      expect(usernameInput.props().value).toBe("rex");
    });
    test("filling in name triggers onChange", () => {
      let nameInput = findTestByAttr(wrapper, "name-input");

      nameInput.simulate("change", {
        target: { id: "name", value: "Rex" },
      });

      nameInput = findTestByAttr(wrapper, "name-input");

      expect(nameInput.props().value).toBe("Rex");
    });
    test("filling in age triggers onChange", () => {
      let ageInput = findTestByAttr(wrapper, "age-input");

      ageInput.simulate("change", {
        target: { id: "age", value: "5" },
      });

      ageInput = findTestByAttr(wrapper, "age-input");

      expect(ageInput.props().value).toBe("5");
    });
    test("filling in breed triggers onChange", () => {
      let breedInput = findTestByAttr(wrapper, "breed-input");

      breedInput.simulate("change", {
        target: { id: "breed", value: "pug" },
      });

      breedInput = findTestByAttr(wrapper, "breed-input");

      expect(breedInput.props().value).toBe("pug");
    });
    test("filling in email triggers onChange", () => {
      let emailInput = findTestByAttr(wrapper, "email-input");

      emailInput.simulate("change", {
        target: { id: "email", value: "rex@dog.com" },
      });

      emailInput = findTestByAttr(wrapper, "email-input");

      expect(emailInput.props().value).toBe("rex@dog.com");
    });
    test("filling in password triggers onChange", () => {
      let passwordInput = findTestByAttr(wrapper, "password-input");

      passwordInput.simulate("change", {
        target: { id: "password", value: "secret" },
      });

      passwordInput = findTestByAttr(wrapper, "password-input");

      expect(passwordInput.props().value).toBe("secret");
    });
    test("filling in password2 triggers onChange", () => {
      let password2Input = findTestByAttr(wrapper, "password2-input");

      password2Input.simulate("change", {
        target: { id: "password2", value: "secret" },
      });

      password2Input = findTestByAttr(wrapper, "password2-input");

      expect(password2Input.props().value).toBe("secret");
    });
    test("filling in name, username, age, breed, email, password and confirm password triggers register function", () => {
        let nameInput = findTestByAttr(wrapper, "name-input");
        nameInput.simulate("change", {
          target: { id: "name", value: "Rex" },
        });

        let ageInput = findTestByAttr(wrapper, "age-input");
        ageInput.simulate("change", {
          target: { id: "age", value: "5" },
        });

        let breedInput = findTestByAttr(wrapper, "breed-input");
        breedInput.simulate("change", {
          target: { id: "breed", value: "pug" },
        });

        let usernameInput = findTestByAttr(wrapper, "username-input");
        usernameInput.simulate("change", {
          target: { id: "username", value: "rex" },
        });
  
        let emailInput = findTestByAttr(wrapper, "email-input");
        emailInput.simulate("change", {
          target: { id: "email", value: "rex@test.com" },
        });
  
        let passwordInput = findTestByAttr(wrapper, "password-input");
        passwordInput.simulate("change", {
          target: { id: "password", value: "secret" },
        });
  
        let password2Input = findTestByAttr(wrapper, "password2-input");
        password2Input.simulate("change", {
          target: { id: "password2", value: "secret" },
        });
  
        const submitButton = findTestByAttr(wrapper, "submit-button");
        submitButton.simulate("click");
  
        expect(registerDog).toHaveBeenCalledTimes(1);
      });
});
});
