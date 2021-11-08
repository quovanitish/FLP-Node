const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// create a new user
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
});

// create a new task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
