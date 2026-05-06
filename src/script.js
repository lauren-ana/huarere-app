function refreshTemperature(response) {
  let currentTemp = response.data.temperature.current;
  let degreeElement = document.querySelector(".forecast-degree");

  let cityInputElement = document.querySelector("#forecast-city");
  cityInputElement.innerHTML = response.data.city;

  degreeElement.innerHTML = Math.round(currentTemp);
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

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSearch);

searchCity("Auckland");
