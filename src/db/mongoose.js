const mongoose = require("mongoose");
const dbURL = "mongodb://127.0.0.1:27017/";
const dbName = "task-manager-api";

mongoose.connect(dbURL + dbName);
