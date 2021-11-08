const mongoose = require("mongoose");
const { User } = require("./models/models");
const dbURL = "mongodb://127.0.0.1:27017/";
const dbName = "task-manager-api";

mongoose.connect(dbURL + dbName, {
  useNewUrlParser: true,
});

const user = new User({
  name: "Mike",
  email: "mike@gmail.com",
  password: "12345678",
});

user
  .save()
  .then(() => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
