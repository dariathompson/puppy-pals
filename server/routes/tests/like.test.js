const { expect } = require("chai");
const request = require("supertest");

const { saveDog, generateToken } = require("./testHelpers.test");
const app = require("../../server");


//  POST add a new like to spots
describe("Like route", async () => {
  let likerDog;
  let token;
  let likeeDog;
  beforeEach(async () => {
    likerDog = await saveDog();
    token = await generateToken(likerDog.id);
    likeeInfo = {
        name: "Kitty",
        username: "kitty",
        age: "2",
        breed: "Pomeranian",
        photo: "https://kitty.jpg",
        email: "kitty@default.com",
        password: "123456",
    },
    likeeDog = await saveDog(likeeInfo);
  });
  it("likes a dog", async () => {

    const likeData = {
        likee: likeeDog.username,
        liker: likerDog.username,
      };

    const response = await request(app)
      .post(`/api/dogs/like`)
      .set({
        "Content-Type": "application/json",
        "x-auth-token": token,
      })
      .send(likeData);

    expect(response.statusCode).to.equal(200);
  });
});
