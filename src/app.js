const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const filePath = "./db/data.json";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Use /read to read/write to the JSON file");
});

// get all users
app.get("/user", function (req, res) {
  fs.readFile(filePath, "utf-8", function (error, data) {
    if (error) {
      res.status(403);
      res.send(error);
      return;
    }
    res.send(data);
  });
});

// get user by id
app.get("/user/:id", function (req, res) {
  fs.readFile(filePath, "utf-8", function (error, data) {
    if (error) {
      res.status(403);
      res.send(error);
      return;
    }

    let paramId = req.params.id;
    let jsonData = JSON.parse(data);
    let userData = jsonData.filter((userObj) => {
      return userObj.id == paramId;
    });

    if (userData.length == 0) {
      res.status(404);
      res.send(userData);
    } else {
      res.send(userData);
    }
  });
});

// update json data
app.post("/user", function (req, res) {
  fs.readFile(filePath, "utf-8", function (error, data) {
    if (error) {
      res.status(403);
      res.send(error);
      return;
    }

    let jsonData = JSON.parse(data);
    if (Object.keys(req.body).length > 0) {
      jsonData.push(req.body);
    }
    updateFile(jsonData, req, res);
  });
});

function updateFile(jsonData, req, res) {
  const data = JSON.stringify(jsonData, null, 2);
  fs.writeFile(filePath, data, function (error) {
    if (error) {
      res.status(400);
      res.send(error);
      return;
    }
    res.send(jsonData);
  });
}

app.listen(port, () => {
  console.log(`Server is up and running at: ${port}`);
});
