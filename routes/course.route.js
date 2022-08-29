const courseController = require("../controllers/course.controller");

module.exports = (app) => {
  app.get("/OLP/api/v1/courses/:id", courseController.getCourse);
  app.get("/OLP/api/v1/courses", courseController.getAllCourse);
  app.post("/OLP/api/v1/courses", courseController.createCourse);
  app.put("/OLP/api/v1/courses/:id", courseController.updateCourse);
};
