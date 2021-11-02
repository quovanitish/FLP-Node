const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from app");
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
