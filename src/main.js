import apiKey from "../config/apiKeys"
import apiURL from "../config/apiURL"

async function getWeatherData() {
    const response = await fetch(`${apiURL}&appid=${apiKey}`);
    var data = await respone.json();
    console.log(data);
}

getWeatherData();