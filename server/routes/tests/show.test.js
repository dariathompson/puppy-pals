const { expect } = require("chai");
const request = require("supertest");

const { saveDog, generateToken } = require("./testHelpers");

const app = require("../../server");

describe("Show route", async () => {
  let dog;
  let token;
  beforeEach(async () => {
    dog = await saveDog();
    token = await generateToken(dog.id);
  });

it("shows a random dog", async () => {
    const secondDog = {
        name: "Luna",
        username: "luna",
        age: "3",
        breed: "Husky",
        photo: "https://luna.jpg",
        email: "luna@default.com",
        password: "654321",
    };
    await saveDog(secondDog);

    data = {
        username: dog.username
    }

    const response = await request(app)
      .get("/api/dogs/show")
      .set("x-auth-token", token)
      .query(data);

    expect(response.statusCode).to.equal(200);
    expect(response.body.length).to.equal(1);
    expect(response.body[0].name).to.equal("Luna");
    expect(response.body[0].username).to.equal("luna");
    expect(response.body[0].age).to.equal("3");
    expect(response.body[0].breed).to.equal("Husky");
    expect(response.body[0].photo).to.equal("https://luna.jpg");
  });
});