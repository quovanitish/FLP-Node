const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400);
    res.send();
  }
});

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      res.send();
      return;
    }

    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.map((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400);
    res.send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.map((update) => (user[update] = req.body[update]));

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
