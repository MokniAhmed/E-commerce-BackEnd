const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },

    email: {
      type: String,
      required: [true, "email required"],
      lowercase: true,
    },
    phone: String,
    subject: String,

    message: {
      type: String,
      required: [true, "message required"],
      minlength: [6, "Too short message"],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
