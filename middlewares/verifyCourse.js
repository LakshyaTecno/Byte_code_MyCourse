const Course = require("../models/course.model");
const constants = require("../utils/constants");

const validateCoursetBody = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Failed ! Course name is not provided",
    });
  }

  if (!req.body.duration) {
    return res.status(400).send({
      message: "Failed ! duration is not provided",
    });
  }
  if (!req.body.price) {
    return res.status(400).send({
      message: "Failed ! price is not provided",
    });
  }
  if (!req.body.mrp) {
    return res.status(400).send({
      message: "Failed ! mrp is not provided",
    });
  }
  if (!req.body.rating) {
    return res.status(400).send({
      message: "Failed ! mrp is not provided",
    });
  }
  const courseTypes = [
    constants.courseTypes.beginner,
    constants.courseTypes.intermediate,
    constants.courseTypes.advance,
  ];
  if (!req.body.type) {
    return res.status(400).send({
      message: "Failed ! type is not provided",
    });
  } else if (!courseTypes.includes(req.body.type)) {
    return res.status(400).send({
      message:
        "type provided is not correct. Possible correct values : BEGINNER | INTERMEDIATE | ADVANCE",
    });
  }

  const categoryTypes = [
    constants.categoryType.programming,
    constants.categoryType.art,
    constants.categoryType.business,
  ];
  if (!req.body.category) {
    return res.status(400).send({
      message: "Failed ! category is not provided",
    });
  } else if (!categoryTypes.includes(req.body.category)) {
    return res.status(400).send({
      message:
        "category provided is not correct. Possible correct values PROGRAMMING | ART | BUSINESS",
    });
  }
  try {
    const name = await Course.findOne({ name: req.body.name });
    if (name != null) {
      return res.status(400).send({
        message: "Failed ! name is already taken",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error while validating the request",
    });
  }
};

module.exports = validateCoursetBody;
