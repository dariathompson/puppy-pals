import React from "react";
import { shallow } from "enzyme";

import { Show } from "./Show";
import { findTestByAttr } from "../../testHelper"

describe("Show.js", () => {
  let showDogs = jest.fn();
  let like = jest.fn();
  let dislike = jest.fn();
  let defaultProps;
  let emptyProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      showDogs,
      like,
      dislike,
      auth: {
       dog: {
        name: "Rex",
        photo: "https://rex.jpg",
        age: "2",
        breed: "German Shepherd"
       }
      },
      errors: {},
      dogs: {
        dogs: [
            {
              name: "Bow",
              photo: "https://bow.jpg",
              age: "3",
              breed: "Pomeranian",
              username: "bow"
            },
            {
              name: "Baxter",
              photo: "https://baxter.jpg",
              age: "1",
              breed: "Jack Russel",
              username: "baxter"
            }
        ],
        matches: []
      }
    };
    emptyProps = {
        showDogs,
        like,
        dislike,
        auth: {
         dog: {
          name: "Rex",
          photo: "https://rex.jpg",
          age: "2",
          breed: "German Shepherd"
         }
        },
        errors: {},
        dogs: {
          dogs: [],
          matches: []
        }
      };
  });

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Show {...setupProps} />);
  };

  const emptySetup = (props = {}) => {
    const setupEmptyProps = { ...emptyProps, ...props };
    return shallow(<Show {...setupEmptyProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const showContainer = findTestByAttr(wrapper, "show-container");

    expect(showContainer.length).toBe(1);
  });

  test("tells if there is no one new around you", () => {
    const wrapper = emptySetup();
    const nooneMessage = findTestByAttr(wrapper, "noone-message");

    expect(nooneMessage.length).toBe(1);
    expect(nooneMessage.text()).toBe("There is no one new around you");
  });

  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("cards with potential matches", () => {
      const showCard = findTestByAttr(wrapper, "show-card");

      expect(showCard.length).toBe(2);
    });
    test("names of potential matches", () => {
      const nameElement = findTestByAttr(wrapper, "name-element");

      expect(nameElement.length).toBe(2);
      expect(nameElement.first().text()).toBe("Bow");
      expect(nameElement.last().text()).toBe("Baxter");
    });
    test("ages of potential matches", () => {
      const ageElement = findTestByAttr(wrapper, "age-element");

      expect(ageElement.length).toBe(2);
      expect(ageElement.first().text()).toBe("3");
      expect(ageElement.last().text()).toBe("1");
    });
    test("breeds of potential matches", () => {
      const breedElement = findTestByAttr(wrapper, "breed-element");

      expect(breedElement.length).toBe(2);
      expect(breedElement.first().text()).toBe("Pomeranian");
      expect(breedElement.last().text()).toBe("Jack Russel");
    });
    test("photos of potential matches", () => {
      const photoElement = findTestByAttr(wrapper, "photo-element");

      expect(photoElement.length).toBe(2);
      expect(photoElement.first().prop("src")).toEqual("https://bow.jpg");
      expect(photoElement.last().prop("src")).toEqual("https://baxter.jpg");
    });
  });
});
