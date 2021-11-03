const path = require("path");
const express = require("express");
const hbs = require("hbs");
const port = 3000;
const app = express();

// Defining paths
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Weather App",
    title: "Forecast",
  });
});

app.get("*", (req, res) => {
  res.render("wildcard", { errorMessage: "Error 404: Page not found." });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
