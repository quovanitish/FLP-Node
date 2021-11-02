const path = require("path");
const express = require("express");
const port = 3000;
const app = express();

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
