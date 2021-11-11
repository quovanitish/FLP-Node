const fs = require("fs");
const filePath = "./db/data.json";

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

module.exports = {
  getAllUsers: (req, res) => {
    fs.readFile(filePath, "utf-8", function (error, data) {
      if (error) {
        res.status(403);
        res.send(error);
        return;
      }
      res.send(data);
    });
  },

  getUserById: (req, res) => {
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
  },

  updateUsers: (req, res) => {
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
  },
};
