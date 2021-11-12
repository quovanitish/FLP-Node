const fs = require("fs");
const filePath = "./db/data.json";

function updateFile(jsonData, req, res, next) {
  const data = JSON.stringify(jsonData, null, 2);
  fs.writeFile(filePath, data, function (error) {
    if (error) {
      const error = new Error(error.message);
      error.status = error.status;
      next(error);
    }
    res.send(jsonData);
  });
}

module.exports = {
  getAllUsers: (req, res, next) => {
    fs.readFile(filePath, "utf-8", function (error, data) {
      if (error) {
        const error = new Error(error.message);
        error.status = error.status;
        next(error);
      }
      res.send(data);
    });
  },

  getUserById: (req, res, next) => {
    fs.readFile(filePath, "utf-8", function (error, data) {
      if (error) {
        const error = new Error(error.message);
        error.status = error.status;
        next(error);
      }

      let paramId = req.params.id;
      let jsonData = JSON.parse(data);
      let userData = jsonData.filter((userObj) => {
        return userObj.id == paramId;
      });

      if (userData.length == 0) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
      } else {
        res.send(userData);
      }
    });
  },

  updateUsers: (req, res, next) => {
    fs.readFile(filePath, "utf-8", function (error, data) {
      if (error) {
        const error = new Error(error.message);
        error.status = error.status;
        next(error);
      }

      let jsonData = JSON.parse(data);
      if (Object.keys(req.body).length > 0) {
        jsonData.push(req.body);
      }
      
      updateFile(jsonData, req, res, next);
    });
  },
};
