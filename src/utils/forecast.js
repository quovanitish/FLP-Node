const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=052dd5f7c32b098a2cbbcfc0e5df43a1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } 
    else if (!body.list) {
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
