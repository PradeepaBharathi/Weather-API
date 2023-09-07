const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const countryInput = document.getElementById("country-input");
const weatherDetailsElement = document.getElementById("weather-details");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const city = cityInput.value;
    const country = countryInput.value;

    if (city && country) {
        fetchWeatherData(city, country);
    } else {
        alert("Please enter both city and country.");
    }
});

function fetchWeatherData(city, country) {
    const apiKey = "a9cfdb29a716e26d71aebb273da499d6";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const cityName = data.name;
                const countryName = data.sys.country;

                displayWeatherDetails(cityName, countryName, temperature, description);
            } else {
                alert("City not found. Please check your input.");
            }
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeatherDetails(city, country, temperature, description) {
    weatherDetailsElement.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>Temperature: ${temperature} K</p>
        <p>Description: ${description}</p>
    `;
}
