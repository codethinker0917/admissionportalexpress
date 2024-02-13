const mongoose = require("mongoose");

const Courseschema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },
    phone: {
      type: Number,
      Required: true,
    },
    dob: {
      type: String,
      Required: true,
    },
    address: {
      type: String,
      Required: true,
    },
    gender: {
      type: String,
      Required: true,
    },
    education: {
      type: String,
      Required: true,
    },
    course: {
      type: String,
      Required: "course",
    },
    comment: {
      type: String,
      default: "panding",
    },
    status: {
      type: String,
      default: "panding",
    },

    user_id: {
      type: String,
      Required: true,
    },
  },
  { timestamps: true }
);
const CourseModel = mongoose.model("course", Courseschema);

module.exports = CourseModel;
