const fs = require("fs");
const AppError = require("../utils/appError");
const filePath = "./db/data.json";

function updateFile(jsonData, req, res, next) {
  try {
    const data = JSON.stringify(jsonData, null, 2);
    fs.writeFile(filePath, data, function (error) {
      if (error) {
        throw new AppError(error.message, error.status);
      }
      res.send(jsonData);
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers: (req, res, next) => {
    try {
      fs.readFile(filePath, "utf-8", function (error, data) {
        if (error) {
          throw new AppError(error.message, error.status);
        }
        res.send(data);
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: (req, res, next) => {
    try {
      fs.readFile(filePath, "utf-8", function (error, data) {
        if (error) {
          throw AppError(error.message, error.status);
        }

        let paramId = req.params.id;
        let jsonData = JSON.parse(data);
        let userData = jsonData.filter((userObj) => {
          return userObj.id == paramId;
        });

        if (userData.length == 0) {
          throw new AppError("User not found", 404);
        } else {
          res.send(userData);
        }
      });
    } catch (error) {
      next(error);
    }
  },

  updateUsers: (req, res, next) => {
    try {
      fs.readFile(filePath, "utf-8", function (error, data) {
        if (error) {
          throw new AppError(error.message, error.status);
        }

        let jsonData = JSON.parse(data);
        if (Object.keys(req.body).length > 0) {
          jsonData.push(req.body);
        }
        updateFile(jsonData, req, res, next);
      });
    } catch (error) {
      next(error);
    }
  },
};
