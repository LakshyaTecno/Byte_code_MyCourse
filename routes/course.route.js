const courseController = require("../controllers/course.controller");

module.exports = (app) => {
  app.post("/OLP/api/v1/courses/", courseController.createCourse);

  app.put("/OLP/api/v1/courses/:id", courseController.updateCourse);
};
