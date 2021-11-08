const express = require("express");
const mongoose = require("mongoose");
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
      res.status(201);
      res.send(user);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
    });
});

// get all users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500);
      res.send(error);
    });
});

// get user by id
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404);
        res.send();
        return;
      }

      res.send(user);
    })
    .catch((error) => {
      res.status(500);
      res.send(error);
    });
});

// create a new task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201);
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
