import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const api_key = "000902a590d2304a5d7ee1ebfc3e2f79";

    const search = async () => {
        const inputElement = document.querySelector(".cityInput");
        const city = inputElement.value.trim();
        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
            const response = await fetch(url);
            if (!response.ok || city==="nobin") {
                if ( city==="nobin"){
                    throw new Error("ummaa");
                }
                throw new Error("City not found. Please try again.");
            }
            const data = await response.json();
            setWeatherData(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeatherData(null);
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Enter city name' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {weatherData && (
                <>
                    <div className="weather-image">
                        <img src={cloud_icon} alt="Weather" />
                    </div>
                    <div className="weather-temp">{Math.round(weatherData.main.temp)}°C</div>
                    <div className="weather-location">{weatherData.name}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} alt="Humidity" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{weatherData.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={wind_icon} alt="Wind" className="icon" />
                            <div className="data">
                                <div className="wind-rate">{weatherData.wind.speed} km/hr</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;
