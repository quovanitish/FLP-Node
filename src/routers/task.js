const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/tasks", (req, res) => {
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

router.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500);
      res.send(error);
    });
});

router.get("/tasks/:id", (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((task) => {
      if (!task) {
        res.status(404);
        res.send();
        return;
      }

      res.send(task);
    })
    .catch((error) => {
      res.status(500);
      res.send(error);
    });
});

module.exports = router;
