// Variables globales
const apiKey = 'db5067a305d7244fd6baf81271830854';
const cityInput = document.getElementById('cityInput');
const currentWeatherBtn = document.getElementById('currentWeatherBtn');
const forecastBtn = document.getElementById('forecastBtn');
const weatherResult = document.getElementById('weatherResult');
const forecastResult = document.getElementById('forecastResult');

// Función para manejar errores
function handleError(message) {
    alert(message);
    console.error(message);
}

// Función para mostrar el clima actual
function getCurrentWeather() {
    const city = cityInput.value.trim();

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    weatherResult.style.display = "block";
                    weatherResult.innerHTML = `
                        <h2 style="display: inline-block; background-color: gray; color: white; padding: 5px 10px; border-radius: 15px;">
                            Clima actual en ${data.name}
                        </h2>
                        <p>Temperatura: ${data.main.temp}°C</p>
                        <p>Tiempo: ${data.weather[0].description}</p>
                        <p>Humedad: ${data.main.humidity}%</p>
                        <p>Velocidad del viento: ${data.wind.speed} m/s</p>
                    `;
                } else {
                    handleError('No se encontró la ciudad');
                }
            })
            .catch(() => handleError('Un error ocurrió al cargar la información.'));
    } else {
        handleError('Ingresa un nombre de una ciudad');
    }
}

// Función para mostrar el pronóstico de 5 días
function getForecast() {
    const city = cityInput.value.trim();

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "200") {
                    forecastResult.style.display = "block";
                    forecastResult.innerHTML = `<h2>Pronóstico a 5 días para ${data.city.name}</h2>`;

                    let forecastHTML = "";
                    let date = 1;

                    for (let i = 0; i < data.list.length; i += 8) {
                        const forecast = data.list[i];
                        const icon = forecast.weather[0].icon;
                        const tempDay = forecast.main.temp;
                        const tempNight = forecast.main.temp_min;

                        forecastHTML += `
                            <div class="forecast-day">
                                <h3 style="display: inline-block; background-color: gray; color: white; padding: 5px 10px; border-radius: 15px;">
                                    Día ${date}
                                </h3>
                                <br>
                                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${forecast.weather[0].description}">
                                <p>Día: ${tempDay}°C</p>
                                <p>Noche: ${tempNight}°C</p>
                            </div>
                        `;
                        date++;
                    }

                    forecastResult.innerHTML += `<div class="forecast-container">${forecastHTML}</div>`;
                } else {
                    handleError('No se encontró la ciudad');
                }
            })
            .catch(() => handleError('Un error ocurrió al cargar la información.'));
    } else {
        handleError('Ingresa un nombre de una ciudad');
    }
}

// Eventos
currentWeatherBtn.addEventListener('click', getCurrentWeather);
forecastBtn.addEventListener('click', getForecast);
