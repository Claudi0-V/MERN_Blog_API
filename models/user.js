const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    min: 5,
    max: 25,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    min: 10,
    max: 125,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
