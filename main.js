// API endpoint and  API key
const apiKey = '551b043ea7a8e5c965cf59a803e5c7ae';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Selecting elements
const cityInput = document.getElementById('cityinput');
const addButton = document.getElementById('add');
const cityOutput = document.getElementById('cityoutput');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');

// Event listener for the submit button
addButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city.trim() !== '') {
        getWeather(city);
    }
});

// Function to fetch weather data from the API
function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            clearWeatherData();
            cityOutput.textContent = 'An error occurred while fetching weather data.';
        });
}

// Function to display weather data
function displayWeather(data) {
    cityOutput.textContent = data.name;
    description.textContent = data.weather[0].description;
    const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
    temp.textContent = `Temperature: ${temperatureCelsius}°C`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Function to clear weather data
function clearWeatherData() {
    cityOutput.textContent = '';
    description.textContent = '';
    temp.textContent = '';
    wind.textContent = '';
}
