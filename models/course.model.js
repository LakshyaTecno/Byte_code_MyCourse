const mongoose = require("mongoose");

const constants = require("../utils/constants");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      constants.courseTypes.beginner,
      constants.courseTypes.intermediate,
      constants.courseTypes.advance,
    ],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
    enum: [
      constants.ratingTypes.one,
      constants.ratingTypes.two,
      constants.ratingTypes.three,
      constants.ratingTypes.four,
      constants.ratingTypes.five,
    ],
  },
  category: {
    type: String,
    required: true,
    enum: [
      constants.categoryType.programming,
      constants.categoryType.art,
      constants.categoryType.business,
    ],
  },
  thumbnail: {
    type: String,
    required: true,
  },
  demo: {
    type: String,
    required: true,
  },
  partner: {
    type: String,
    required: true,
    enum: [
      constants.categoryType.google,
      constants.categoryType.facebook,
      constants.categoryType.microsoft,
    ],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
