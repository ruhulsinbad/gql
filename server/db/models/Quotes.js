const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title"],
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Quote = mongoose.model("quote", quoteSchema);

module.exports = Quote;
