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
    const courses = await Course.find();

    let courseMatchesWithName = [];
    if (courseName) {
      courseMatchesWithName = await Course.find({
        name: { $regex: new RegExp(courseName) },
      });
    }

    var courseMatchesWithRating = [];
    if (courseRating) {
      courseMatchesWithRating = await Course.find({
        rating: courseRating,
      });
    }

    var courseMatchesWithCategory = [];
    if (courseCategory) {
      courseMatchesWithCategory = await Course.find({
        category: courseCategory,
      });
    }

    var courseMatchesWithPartner = [];
    if (coursePartner) {
      courseMatchesWithPartner = await Course.find({ partner: coursePartner });
    }

    var courseMatchesWithPrice = [];
    if (priceMin || priceMax) {
      courseMatchesWithPrice = await Course.find({
        price: { $gte: priceMin, $lte: priceMax },
      });
    }
    let name = [];
    let category = [];
    let partner = [];
    let price = [];
    let rating = [];
    courseMatchesWithName.map((obj) => {
      name.push(obj.name);
    });
    courseMatchesWithCategory.map((obj) => {
      category.push(obj.category);
    });
    courseMatchesWithPrice.map((obj) => {
      price.push(obj.price);
    });
    courseMatchesWithPartner.map((obj) => {
      partner.push(obj.partner);
    });
    courseMatchesWithRating.map((obj) => {
      rating.push(obj.rating);
    });
    queryObj["$and"] = [
      { name: { $in: name } },
      { category: { $in: category } },
      { partner: { $in: partner } },
      { rating: { $in: rating } },
      { price: { $in: price } },
    ];

    let filetred_data = await Course.find(queryObj);

    console.log(filetred_data);
    filetred_data = filetred_data.filter(
      (obj, index, self) => index === self.findIndex((el) => el._id === obj._id)
    );
    res.status(200).send(filetred_data);
  } catch (err) {
    console.log("Some error while filter course ", err.message);
    res.status(500).send({
      message: "Some internal error while updating the course",
    });
  }
};
