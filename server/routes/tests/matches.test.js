const { expect } = require("chai");
const request = require("supertest");

const { saveDog, generateToken } = require("./testHelpers");

const app = require("../../server");

describe("Matches route", async () => {
  let dog;
  beforeEach(async () => {
    dogInfo = {
        name: "Luna",
        username: "luna",
        age: "3",
        breed: "Husky",
        photo: "https://luna.jpg",
        email: "luna@default.com",
        password: "654321",
        matches: [
            {
                name: "Bow",
                username: "bow",
                age: "2",
                breed: "Labrador",
                photo: "https://bow.jpg",
            },
            {
                name: "Alfie",
                username: "alfie",
                age: "8",
                breed: "Pomeranian",
                photo: "https://alfie.jpg",
            }
        ]  
    };
    dog = await saveDog(dogInfo);
    token = await generateToken(dog.id);
  });

it("shows matches", async () => {
    data = {
        username: dog.username
    }

    const response = await request(app)
      .get("/api/dogs/matches")
      .set("x-auth-token", token)
      .query(data);

    expect(response.statusCode).to.equal(200);
    expect(response.body.length).to.equal(2);
  });
});