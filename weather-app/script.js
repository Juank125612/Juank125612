async function fetchWeather() {

  let searchInput = document.getElementById("search").value;
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "block";

  const apiKey = "";

  if (searchInput == "") {
    weatherDataSection.innerHTML = `
      <div>
        <h2>Empty Input!</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
      </div>
    `;
    return;
  }

  const geocodeData = await getLonAndLat(searchInput);
  const weatherData = await getWeatherData(geocodeData.lon, geocodeData.lat);

  async function getLonAndLat(searchInput) {

    const countryCode = 1;
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;

    const response = await fetch(geocodeURL);
    const data = await response.json();

    return data[0];
  }

  async function getWeatherData(lon, lat) {

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await fetch(weatherURL);
    const data = await response.json();

    return data;
  }

  weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" width="100"/>
    <div>
      <h2>${weatherData.name}</h2>
      <p><strong>Temperature:</strong> ${Math.round(weatherData.main.temp - 273.15)}°C</p>
      <p><strong>Description:</strong> ${weatherData.weather[0].description}</p>
    </div>
  `;
}