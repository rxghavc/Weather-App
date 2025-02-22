import apiKey from "../config/apiKeys.js";
import apiURL from "../config/apiURL.js";

const searchbox = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes.substr(-2)} ${ampm}`;
    return formattedTime;
}

async function getWeatherData(city) {
    const response = await fetch(`${apiURL}?q=${city}&appid=${apiKey}&units=metric`);

    if (response.status === 404) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    } else {
        var data = await response.json();

        const cityElement = document.querySelector(".city");
        const tempElement = document.querySelector(".temperature");
        const humidityElement = document.querySelector(".humidity");
        const windElement = document.querySelector(".wind");
        const sunriseElement = document.querySelector(".sunrise");
        const sunsetElement = document.querySelector(".sunset");

        if (cityElement) cityElement.innerText = `${data.name}, ${data.sys.country}`;
        if (tempElement) tempElement.innerText = Math.round(data.main.temp) + " °C";
        if (humidityElement) humidityElement.innerText = data.main.humidity + " %";
        if (windElement) windElement.innerText = data.wind.speed + " km/h";
        if (sunriseElement) sunriseElement.innerText = formatTime(data.sys.sunrise);
        if (sunsetElement) sunsetElement.innerText = formatTime(data.sys.sunset);

        if (data.weather[0].main === "Clear") {
            weatherIcon.src = "../images/clear.png";
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "../images/clouds.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "../images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "../images/mist.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "../images/rain.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "../images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    const city = searchbox.value;
    getWeatherData(city);
});