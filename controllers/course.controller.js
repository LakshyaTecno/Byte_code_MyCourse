const express = require("express");
const Course = require("../models/course.model");

exports.createCourse = async (req, res) => {
  try {
    const coursetObj = {
      name: req.body.name,
      type: req.body.type,
      duration: req.body.duration,
      price: req.user.price,
      mrp: req.user.mrp,
      discount: req.user.discount,
      rating: req.user.rating,
      category: req.user.category,
      thumbnail: req.user.thumbnail,
      demo: req.user.demo,
      partner: req.user.partner,
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
