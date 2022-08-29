/**
 * This is going to be the starting point of the application
 */
const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDb");
});
db.once("open", () => {
  console.log("connected to mongodb");
});

//require("./routes/auth.route")(app);
app.listen(serverConfig.PORT, () => {
  console.log("Started the server on the PORT number : ", serverConfig.PORT);
});
