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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.map((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400);
    res.send({ error: "Invalid updates" });
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.map((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
