const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  likes: [{ username: String }],
  dislikes: [{ username: String }],
});
module.exports = Dog = mongoose.model("dogs", DogSchema);