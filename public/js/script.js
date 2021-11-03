const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationPlace = document.querySelector("#location");
const forecastPlace = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  locationPlace.textContent = "Loading....";
  forecastPlace.textContent = "";

  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationPlace.textContent = data.error;
        forecastPlace.textContent = "";
      } else {
        locationPlace.textContent = data.address + ", " + data.location;
        forecastPlace.textContent = data.forecast;
      }
    });
  });
});
