const API_KEY = 'f44165d7a18b5e2219b54ca56aaed4f6'; // Replace with your WeatherStack API key

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('searchBtn').addEventListener('click', fetchWeather);
    document.getElementById('cityInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') fetchWeather();
    });
});

function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return alert('Please enter a city name');

    fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error.info);
                return;
            }
            updateCurrentWeather(data.current, data.location);
            updateForecast();
        })
        .catch(() => alert('Failed to fetch weather data'));
}

function updateCurrentWeather(data, location) {
    document.querySelector('[data-api="current_city"]').textContent = `${location.name}, ${location.country}`;
    document.querySelector('[data-api="current_temperature"]').textContent = data.temperature;
    document.querySelector('[data-api="current_icon"]').src = data.weather_icons[0];
    document.querySelector('[data-api="current_description"]').textContent = data.weather_descriptions[0];
    document.querySelector('[data-api="current_wind"]').textContent = data.wind_speed;
    document.querySelector('[data-api="current_precip"]').textContent = data.precip;
    document.querySelector('[data-api="current_pressure"]').textContent = data.pressure;
    document.querySelector('[data-api="current_humidity"]').textContent = data.humidity;
    document.querySelector('[data-api="current_visibility"]').textContent = data.visibility;
}

function updateForecast() {
    const forecastContainer = document.querySelector('[data-api="forecast"]');
    forecastContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <div class="forecast-day">Day ${i}</div>
            <div class="forecast-temp">${Math.floor(Math.random() * 10 + 20)}°C</div>
            <div class="forecast-description">Partly Cloudy</div>
        `;
        forecastContainer.appendChild(forecastCard);
    }
}
