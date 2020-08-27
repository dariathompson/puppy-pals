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
  photo: {
    data: Buffer,
    contentType: String,
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
  likes: [
    {
      dogID: { type: Schema.Types.ObjectId, ref: "dog" },
    },
  ],
  dislikes: [
    {
      dogID: { type: Schema.Types.ObjectId, ref: "dog" },
    },
  ],
  matches: [
    {
      dogID: { type: Schema.Types.ObjectId, ref: "dog" },
    },
  ],
});
module.exports = Dog = mongoose.model("dogs", DogSchema);