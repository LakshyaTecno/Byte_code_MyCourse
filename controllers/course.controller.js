const { addListener } = require("nodemon");
const Course = require("../models/course.model");

exports.createCourse = async (req, res) => {
  try {
    const coursetObj = {
      name: req.body.name,
      type: req.body.type,
      duration: req.body.duration,
      price: req.body.price,
      mrp: req.body.mrp,
      discount: req.body.discount,
      rating: req.body.rating,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      demo: req.body.demo,
      partner: req.body.partner,
    };

    const courseCreated = await Course.create(coursetObj);
    if (courseCreated) {
      console.log(`#### New Course '${courseCreated.name}' created  ####`);
      res.status(201).send(courseCreated);
    }
  } catch (err) {
    console.log("#### Error while creating new course #### ", err);
    res.status(500).send({
      message: "Internal server error while creating new course",
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    console.log(req.params.id);
    return res.status(200).send(course);
  } catch (err) {
    console.log("#### Error while getting new course with id ", err);
    res.status(500).send({
      message: "Internal server error while getting  course",
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });

    /**
     * Update this course object based on the request body
     * passed
     */

    course.name = req.body.name != undefined ? req.body.title : course.name;

    const updatedCourse = await course.save();

    res.status(200).send(updatedCourse);
  } catch (err) {
    console.log("Some error while updating course ", err.message);
    res.status(500).send({
      message: "Some internal error while updating the course",
    });
  }
};

exports.getAllCourse = async (req, res) => {
  const courseName = req.query.name;
  const courseRating = req.query.rating;
  const courseCategory = req.query.category;
  const coursePartner = req.query.partner;
  const priceMin = req.query.min;
  const priceMax = req.query.max;
  try {
    let queryObj = {};
    let filetred_data = [];
    if (courseName) {
      let len = courseName.length;
      let searchStr = courseName.substring(1, len - 2);
      console.log(searchStr);
      filetred_data = await Course.find({
        name: { $regex: new RegExp(searchStr) },
      }).limit(10);
    } else {
      queryObj["$or"] = [
        { category: courseCategory },
        { partner: coursePartner },
        { rating: courseRating },
        { price: { $gte: priceMin, $lte: priceMax } },
      ];
      filetred_data = await Course.find(queryObj);
      filetred_data = filetred_data.filter(
        (obj, index, self) =>
          index === self.findIndex((el) => el._id === obj._id)
      );
    }

    console.log(filetred_data);

    res.status(200).send(filetred_data);
  } catch (err) {
    console.log("Some error while filter course ", err.message);
    res.status(500).send({
      message: "Some internal error while gettings the course",
    });
  }
};
