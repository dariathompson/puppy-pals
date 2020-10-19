/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');

const { saveDog } = require('./testHelpers.js');

const app = require('../../server');

describe('auth routes', () => {
  let newDog;
  beforeEach(() => {
    newDog = {
      name: 'test',
      username: 'testy',
      password: 'testpassword',
      email: 'test@test.com',
    };
  });
  describe('Log in user', async () => {
    describe('credential check', () => {
      it('for password only', async () => {
        delete newDog.username;
        const expectedErrorMsg = 'Username is required';
        const response = await request(app)
          .post('/api/dogs/login')
          .set('Content-Type', 'application/json')
          .send(newDog);

        expect(response.statusCode).to.equal(400);
        expect(response.body.username).to.equal(expectedErrorMsg);
      });
      it('for username only', async () => {
        delete newDog.password;
        const expectedErrorMsg = 'Password field is required';
        const response = await request(app)
          .post('/api/dogs/login')
          .set('Content-Type', 'application/json')
          .send(newDog);

        expect(response.statusCode).to.equal(400);
        expect(response.body.password).to.equal(expectedErrorMsg);
      });
    });

    it('success', async () => {
      await saveDog(newDog);

      delete newDog.name;
      delete newDog.email;

      const response = await request(app)
        .post('/api/dogs/login')
        .set('Content-Type', 'application/json')
        .send(newDog);

      expect(response.statusCode).to.equal(200);
      expect(response.body.token).to.be.a('string');
    });

    it('not successfull with wrong username', async () => {
      await saveDog(newDog);

      delete newDog.name;
      delete newDog.email;
      newDog.username = 'notRightUsername';

      const response = await request(app)
        .post('/api/dogs/login')
        .set('Content-Type', 'application/json')
        .send(newDog);

      expect(response.statusCode).to.equal(401);
      expect(response.body.usernamenotfound).to.equal('Username not found');
    });
  });
});
