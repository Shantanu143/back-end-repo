const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add the contact name "],
    },
    email: {
      type: String,
      require: [true, "Please add the Email address "],
    },
    phone: {
      type: String,
      require: [true, "Please add your phone number "],
    },
  },
  {
    TimeRanges: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
