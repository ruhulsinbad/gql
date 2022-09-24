const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please entyer your name"],
  },
  email: {
    type: String,
    required: [true, "Please neter your email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
