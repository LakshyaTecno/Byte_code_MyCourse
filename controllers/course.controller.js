const express = require("express");
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

  const courses = await Course.find();
  var filetred_data;
  if (courseName) {
    filetred_data = [];
    courses.forEach((cr) => {
      let crNAme = cr.name + "";
      console.log(crNAme);
      if (crNAme.indexOf(courseName) != -1) {
        filetred_data.push(cr);
      }
    });
    console.log(filetred_data);
  } else if (courseRating) {
    filetred_data = await Course.find({
      rating: courseRating,
    });
  } else if (courseCategory) {
    filetred_data = await Course.find({ category: courseCategory });
  } else if (coursePartner) {
    filetred_data = await Course.find({ partner: coursePartner });
  } else if (priceMin && priceMax) {
    filetred_data = await Course.find({
      price: { $gte: priceMin, $lte: priceMax },
    });
  } else if (
    priceMin &&
    priceMax &&
    courseRating &&
    courseCategory &&
    coursePartner
  ) {
    filetred_data = await Course.find({
      rating: courseRating,
      price: { $gte: min, $lte: max },
      category: courseCategory,
      partner: coursePartner,
    });
  } else if (courseRating && courseCategory && coursePartner) {
    filetred_data = await Course.find({
      rating: courseRating,
      category: courseCategory,
      partner: coursePartner,
    });
  } else if (priceMin && priceMax && courseRating && coursePartner) {
    filetred_data = await Course.find({
      rating: courseRating,
      price: { $gte: min, $lte: max },

      partner: coursePartner,
    });
  } else if (priceMin && priceMax && courseCategory && coursePartner) {
    filetred_data = await Course.find({
      price: { $gte: min, $lte: max },
      category: courseCategory,
      partner: coursePartner,
    });
  } else if (priceMin && priceMax && courseCategory && courseRating) {
    filetred_data = await Course.find({
      price: { $gte: priceMin, $lte: priceMax },
      category: courseCategory,
      rating: courseRating,
    });
  } else if (priceMin && priceMax && courseCategory) {
    filetred_data = await Course.find({
      price: { $gte: priceMin, $lte: priceMax },
      category: courseCategory,
    });
  } else {
    filetred_data = await Course.find();
  }

  res.status(200).send(filetred_data);
};
