function refreshTemperature(response) {
  let currentTemp = response.data.temperature.current;
  let degreeElement = document.querySelector("#forecast-degree");
  let cityInputElement = document.querySelector("#forecast-city");
  let conditionElement = document.querySelector("#condition-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-date");
  let emojiElement = document.querySelector("#forecast-emoji");
  let date = new Date(response.data.time * 1000);

  cityInputElement.innerHTML = response.data.city;
  timeElement.innerHTML = displayDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  degreeElement.innerHTML = Math.round(currentTemp);
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  searchForecast(response.data.city);
}

function displayDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "9ca9f78o333f17d1c9f4d8ae5b0f036t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(refreshTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSearch);

function searchForecast(city) {
  let apiKey = "9ca9f78o333f17d1c9f4d8ae5b0f036t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let weeklyForecastElement = document.querySelector("#weekly-forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-days">
        <div class="forecast-day">
          ${formatDay(day.time)}
        </div>
        <div class="forecast-temperatures">
          <strong>${Math.round(day.temperature.maximum)}</strong> / ${Math.round(day.temperature.minimum)}
        </div>
        <div><img src="${day.condition.icon_url}" class="weekly-emoji"/></div>
      </div>`;
    }
  });

  weeklyForecastElement.innerHTML = forecastHtml;
}

searchCity("Auckland");
