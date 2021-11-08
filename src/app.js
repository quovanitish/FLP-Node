const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
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
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Weather App",
    title: "Forecast",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/feedback", (req, res) => {
  res.render("feedback");
});

app.post("/submit", (req, res) => {
  const feedback = req.body;
  res.redirect("/");
  console.log(feedback);
});

app.get("*", (req, res) => {
  res.render("wildcard", { errorMessage: "Error 404: Page not found." });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
