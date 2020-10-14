import React from "react";
import { shallow } from "enzyme";

import Landing from "./Landing";

describe.only("Landing.js", () => {
    const setup = () => {
      return shallow(<Landing />);
    };

    test("renders without error", () => {
        const wrapper = setup();
        const landingContainer = findTestByAttr(wrapper, "landing-container");
    
        expect(landingContainer.length).toBe(1);
    });
    describe("displays", () => {
        test("image", () => {
          const wrapper = setup();
          const imageDog = findTestByAttr(wrapper, "image-dog");
    
          expect(imageDog.length).toBe(1);
        });
        test("title", () => {
          const wrapper = setup();
          const title = findTestByAttr(wrapper, "test-title");
    
          expect(title.length).toBe(1);
        });
      });
});

const findTestByAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
};