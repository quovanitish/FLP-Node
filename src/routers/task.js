const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201);
    res.send(task);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(404);
    res.send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404);
      res.send();
      return;
    }

    res.send(task);
  } catch (error) {
    res.status(404);
    res.send(error);
  }
});

module.exports = router;
