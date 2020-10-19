const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const passport = require("passport");
const dogs = require("./routes/api/dogs");
const cors = require("cors");

require('dotenv').config();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended: true
    })
);

app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

// DB Config
let db;
if (process.env.NODE_ENV === "test"){
    db = process.env.ATLAS_TEST_URI;
}else{
    db = process.env.ATLAS_URI;
}

// Connect to MongoDB
mongoose
    .connect(
        db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log(`MongoDB ${process.env.NODE_ENV} successfully connected`))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/dogs", dogs);


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;