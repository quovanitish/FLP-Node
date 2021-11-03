const request = require("request");
require("dotenv").config();

const geocode = (address, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${process.env.API_TOKEN}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!body.coord) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.coord.lat,
        longitude: body.coord.lon,
        location: body.sys.country,
      });
    }
  });
};

module.exports = geocode;
