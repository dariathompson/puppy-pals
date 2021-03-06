/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const keys = require("../../config/keys");
// Load input validation
const AWS = require('aws-sdk');
const multer = require('multer');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load Dog model
const Dog = require('../../models/Dog');

require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register', upload.single('photo'), (req, res) => {
  const photo = req.file;
  const s3PhotoURL = process.env.AWS_BUCKET_URL;

  const s3bucket = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: photo.originalname,
    Body: photo.buffer,
    ContentType: photo.mimetype,
    ACL: 'public-read',
  };

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Dog.findOne({
    username: req.body.username,
  }).then((dog) => {
    if (dog) {
      return res.status(400).json({
        username: 'Username already exists',
      });
    }
    s3bucket.upload(params, (err, data) => {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
        const image = s3PhotoURL + params.Key;

        const newDog = new Dog({
          name: req.body.name,
          username: req.body.username,
          breed: req.body.breed,
          photo: image,
          age: req.body.age,
          email: req.body.email,
          password: req.body.password,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newDog.password, salt, (err, hash) => {
            if (err) throw err;
            newDog.password = hash;
            newDog
              .save()
              .then((dog) => res.json(dog))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  });
});

// @route POST api/dogs/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const {
    errors,
    isValid,
  } = validateLoginInput(req.body);
    // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username } = req.body;
  const { password } = req.body;
  // Find user by username
  Dog.findOne({
    username,
  }).then((dog) => {
    // Check if user exists
    if (!dog) {
      return res.status(401).json({
        usernamenotfound: 'Username not found',
      });
    }
    // Check password
    bcrypt.compare(password, dog.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        const payload = {
          id: dog.id,
          name: dog.name,
          photo: dog.photo,
          age: dog.age,
          breed: dog.breed,
          username: dog.username,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET_JWT, {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          },
        );
      } else {
        return res
          .status(400)
          .json({
            passwordincorrect: 'Password incorrect',
          });
      }
    });
  });
});

router.get('/show', async (req, res) => {
  try {
    const dog = await Dog.findOne({ username: req.query.username });

    Dog.aggregate([{
      $match: {
        $and:
        [{ _id: { $ne: dog._id } },
          { _id: { $nin: dog.likes.map((x) => x.dogID) } },
          { _id: { $nin: dog.dislikes.map((x) => x.dogID) } },
          { _id: { $nin: dog.matches.map((x) => x.dogID) } },
        ],
      },
    }, { $sample: { size: 1 } }]).then((data) => {
      res.send(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'server error' });
  }
});

router.post('/like', async (req, res) => {
  try {
    const liker = await Dog.findOne({ username: req.body.liker });
    const likee = await Dog.findOne({ username: req.body.likee });

    if (likee.likes.map((x) => x.dogID).includes(liker._id)) {
      dog1 = await Dog.findOneAndUpdate({ _id: liker._id }, { $addToSet: { matches: { dogID: likee._id } } });
      dog2 = await Dog.findOneAndUpdate({ _id: likee._id }, { $addToSet: { matches: { dogID: liker._id } } });
      res.send('Match');
    } else {
      dog = await Dog.findOneAndUpdate({ _id: liker._id }, { $addToSet: { likes: { dogID: likee._id } } });
      return res.status(200).json({ dog, likes: dog.likes });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/dislike', async (req, res) => {
  try {
    const disliker = await Dog.findOne({ username: req.body.disliker });
    const dislikee = await Dog.findOne({ username: req.body.dislikee });

    dog = await Dog.findOneAndUpdate({ _id: disliker._id }, { $addToSet: { dislikes: { dogID: dislikee._id } } });
    return res.status(200).json({ dog, dislikes: dog.dislikes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/matches', async (req, res) => {
  try {
    const dog = await Dog.findOne({ username: req.query.username });

    const matches = [];

    for (const match of dog.matches) {
      const matchDog = await Dog.findOne({ _id: match.dogID });
      matches.push(matchDog);
    }
    return res.send(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'server error' });
  }
});

module.exports = router;
