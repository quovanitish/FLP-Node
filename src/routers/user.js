const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/users", (req, res) => {
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

router.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500);
      res.send(error);
    });
});

router.get("/users/:id", (req, res) => {
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

module.exports = router;
