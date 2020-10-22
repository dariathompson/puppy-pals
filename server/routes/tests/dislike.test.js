/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');

const { saveDog, generateToken } = require('./testHelpers');
const app = require('../../server');

describe('Like route', async () => {
  let dislikerDog;
  let token;
  let dislikeeDog;
  beforeEach(async () => {
    dislikerDog = await saveDog();
    token = await generateToken(dislikerDog.id);
    dislikeeInfo = {
      name: 'Kitty',
      username: 'kitty',
      age: '2',
      breed: 'Pomeranian',
      photo: 'https://kitty.jpg',
      email: 'kitty@default.com',
      password: '123456',
    },
    dislikeeDog = await saveDog(dislikeeInfo);
  });
  it('likes a dog', async () => {
    const dislikeData = {
      dislikee: dislikeeDog.username,
      disliker: dislikerDog.username,
    };

    const response = await request(app)
      .post('/api/dogs/dislike')
      .set({
        'Content-Type': 'application/json',
        'x-auth-token': token,
      })
      .send(dislikeData);

    expect(response.statusCode).to.equal(200);
  });
});
