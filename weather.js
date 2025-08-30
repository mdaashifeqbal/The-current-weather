const inputText = document.getElementById("inputText");
const searchButton = document.getElementById("searchButton");
const imageTag = document.querySelector(".weather-image");
const temprature = document.querySelector(".temprature");
const tempratureDescription = document.querySelector(".description");
const humidityPercentage = document.querySelector("#humidity-percentage");
const windSpeed = document.querySelector("#wind-speed");

function weatherCheck(city) {
  //cheking city name is valid or not
  if (city) {
    // fetching data using promise
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${""}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("location Not Found");
        }
        return response.json();
      })
      .then((data) => {
        //extracting temprature of city
        let temp = `${Math.round(data.main.temp - 273.15)}°C`;
        temprature.innerHTML = temp;
        //extracting weather description of city
        tempratureDescription.innerHTML = `${data.weather[0].main}`;
        //changing image according to the temprature description using switch case
        switch (`${data.weather[0].main}`) {
          case "Clouds": {
            imageTag.src = `${"imageassets/cloud.png"}`;
            break;
          }
          case "Clear": {
            imageTag.src = `${"imageassets/clear.png"}`;
            break;
          }
          case "Rain": {
            imageTag.src = `${"imageassets/rain.png"}`;
            break;
          }
          case "Mist": {
            imageTag.src = `${"imageassets/mist.png"}`;
            break;
          }
          case "Snow": {
            imageTag.src = `${"imageassets/snow.png"}`;
            break;
          }
        }
        //extracting wind speed of city
        windSpeed.innerText = `${data.wind.speed}km/h`;
        //extracting humidity percentage of city
        humidityPercentage.innerText = `${data.main.humidity}%`;
      })
      .catch((error) => {
        imageTag.src = `${"imageassets/404.png"}`;
        temprature.innerText = `${0}°C`;
        humidity.innerText = `0%`;
        windSpeed.innerText = `0%`;
        tempratureDescription.innerText = "Location not found";
        alert("Location not found");
      });
  }
}

// click event
searchButton.addEventListener("click", () => {
  let inputValue = inputText.value;
  // calling weathercheck function
  weatherCheck(inputValue);
});
// enter event
document.addEventListener("keydown", function (event) {
  const keyIs = `${event.key}`;
  if (keyIs == "Enter") {
    let inputValue = inputText.value;
    weatherCheck(inputValue);
  }
});
