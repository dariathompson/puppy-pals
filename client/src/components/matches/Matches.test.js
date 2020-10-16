import React from "react";
import { shallow } from "enzyme";

import { Matches } from "./Matches";
import { findTestByAttr } from "../../testHelper"

describe("Matches.js", () => {
  let showMatches = jest.fn();
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      showMatches,
      auth: {
       dog: {
        id: "1",
        name: "Rex",
        photo: "https://rex.jpg",
        age: "2",
        breed: "German Shepherd",
        username: "rex",
       }
      },
      errors: {},
      dogs: {
        matches: [
            {
              id: "2",
              name: "Bow",
              photo: "https://bow.jpg",
              age: "3",
              breed: "Pomeranian",
              username: "bow",
            },
            {
              id: "3",
              name: "Baxter",
              photo: "https://baxter.jpg",
              age: "1",
              breed: "Jack Russel",
              username: "baxter",
            }
        ]
      }
    };
  });

  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Matches {...setupProps} />);
  };

  test("renders without error", () => {
    const wrapper = setup();
    const matchesContainer = findTestByAttr(wrapper, "matches-container");

    expect(matchesContainer.length).toBe(1);
  });

  describe("displays", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("cards with matches", () => {
      const matchCard = findTestByAttr(wrapper, "match-card");

      expect(matchCard.length).toBe(2);
    });
    test("names of matches", () => {
      const nameElement = findTestByAttr(wrapper, "name-element");

      expect(nameElement.length).toBe(2);
      expect(nameElement.first().text()).toBe("Bow");
      expect(nameElement.last().text()).toBe("Baxter");
    });
    test("ages of matches", () => {
      const ageElement = findTestByAttr(wrapper, "age-element");

      expect(ageElement.length).toBe(2);
      expect(ageElement.first().text()).toBe("3");
      expect(ageElement.last().text()).toBe("1");
    });
    test("breeds of matches", () => {
      const breedElement = findTestByAttr(wrapper, "breed-element");

      expect(breedElement.length).toBe(2);
      expect(breedElement.first().text()).toBe("Pomeranian");
      expect(breedElement.last().text()).toBe("Jack Russel");
    });
    test("photos of matches", () => {
      const photoElement = findTestByAttr(wrapper, "photo-element");

      expect(photoElement.length).toBe(2);
      expect(photoElement.first().prop("src")).toEqual("https://bow.jpg");
      expect(photoElement.last().prop("src")).toEqual("https://baxter.jpg");
    });
  });
});
