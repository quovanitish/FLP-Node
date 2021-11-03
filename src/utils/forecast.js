const request = require("request");
require("dotenv").config();

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.API_TOKEN}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (!body.list) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.list[0].weather[0].description +
          ", It is currently " +
          body.list[37].main.temp
      );
    }
  });
};

module.exports = forecast;
