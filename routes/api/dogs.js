const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load Dog model
const Dog = require("../../models/Dog")

// @route POST api/dogs/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Dog.findOne({
        username: req.body.username
    }).then(dog => {
        if (dog) {
            return res.status(400).json({
                username: "Username already exists"
            });
        } else {
            const newDog = new Dog({
                name: req.body.name,
                username: req.body.username,
                breed: req.body.breed,
                age: req.body.age,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newDog.password, salt, (err, hash) => {
                    if (err) throw err;
                    newDog.password = hash;
                    newDog
                        .save()
                        .then(dog => res.json(dog))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/dogs/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;
    // Find user by username
    Dog.findOne({
        username
    }).then(dog => {
        // Check if user exists
        if (!dog) {
            return res.status(404).json({
                usernamenotfound: "Username not found"
            });
        }
        // Check password
        bcrypt.compare(password, dog.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: dog.id,
                    name: dog.name,
                    age: dog.age,
                    breed: dog.breed,
                    username: dog.username
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({
                        passwordincorrect: "Password incorrect"
                    });
            }
        });
    });
});


router.get("/show", (req, res) => {
    console.log(req.query)
    const my_username = req.query.username;
    // find all dogs but current
    Dog.aggregate([{ $match: { username: { $ne: my_username } } }, { $sample: { size: 1 }}]).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving dogs."
        });
    });
});

router.post("/like", (req, res) => {
    console.log(req.body)

    Dog.updateOne({username: req.body.likee},
        {'$push': { likes: {username: req.body.liker }}})
        .then(response => {
            res.status(200).send(response);
          })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while liking a dog."
            });
        });
})

module.exports = router;
