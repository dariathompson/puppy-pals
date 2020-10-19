const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const passport = require('passport');
const db = require('./config/db');
const dogs = require('./routes/api/dogs');

require('dotenv').config();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json({ type: 'application/json' }));

db.connect();

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
// Routes
app.use('/api/dogs', dogs);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;
