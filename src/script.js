function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityInputElement = document.querySelector("#forecast-city");
  cityInputElement.innerHTML = searchInput.value;
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSearch);
