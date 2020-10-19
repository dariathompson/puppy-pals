/* eslint-disable no-console */
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Dog = require('../../models/Dog');

const saveDog = async (dog) => {
  const dogToSave = dog || {
    name: 'Maxy',
    username: 'maxy',
    age: '1',
    breed: 'labrador',
    photo: 'https://lab.jpg',
    email: 'maxy@default.com',
    password: 'defaultPassword',
  };
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(dogToSave.password, salt);
    const dogCreated = new Dog({
      ...dogToSave,
      password: passwordEncrypted,
    });
    const dogSaved = await dogCreated.save();

    return dogSaved;
  } catch (err) {
    console.error(err);
  }
};

const generateToken = (id) => new Promise((resolve, reject) => {
  const payload = {
    dog: {
      id,
    },
  };

  jwt.sign(
    payload,
    process.env.SECRET_JWT,
    { expiresIn: 360000 },
    (err, token) => {
      if (err) { reject(err); }
      resolve(token);
    },
  );
});

module.exports = {
  saveDog,
  generateToken,
};
