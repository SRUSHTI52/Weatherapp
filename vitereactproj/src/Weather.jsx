import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomTextField from './CustomTextfield';
import './App.css';
import {WeatherImages} from './WeatherImages.jsx';
import.meta.env.VITE_APIKEY;


function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null); 
  const fetchData = async (cityName) => {
    try {
      console.log(cityName);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APIKEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city){ fetchData(city);}
   
  };
  //let am = weatherData.weather[0].main
   const weatherImage = weatherData ? WeatherImages[weatherData.weather[0].main] || "/haze.png" : null;
  //const weatherImage = weatherData ? WeatherImages.am || "/haze.png" : null;

  return (
    <>
    <div className="weather-container" >
      <form onSubmit={handleSubmit} className='cuform'>
      <CustomTextField value={city} onChange={handleInputChange} />
        <button className="get" type="submit">Get Weather</button>
      </form>
    </div>
    
    {weatherData ? (
  <div className="weather-details">
     <p id="weatherinfo" > {weatherData.weather[0].main}</p>
     <img id="main" src={weatherImage} alt={weatherData.weather[0].main} />

    <p id="temp">{weatherData.main.temp}°C</p>
    <h2 id="cityname">{weatherData.name}</h2>
    <div className="grid-container">
      
      <div className="grid-item">
      <div className="icon-text-container">
     <img className="icon" src='/temp.png' alt=''/>
        <p>Feels like: {weatherData.main.feels_like}°C</p>
      </div></div>
      <div className="grid-item">
      <div className="icon-text-container">
       <img className="icon" src='/humidity.png' alt=''/>
        <p>Humidity: {weatherData.main.humidity}%</p>
      </div>
      </div>
      <div className="grid-iteml">
      <div className="icon-text-container">
        <img className="icon" src='/pressure.png' alt=''/>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
      </div></div>
      <div className="grid-item">
      <div className="icon-text-container">
        <img className="icon" src='/windspeed.png' alt=''/>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div></div>
    </div>
  </div>
) : null}

    </>
  );
}

export default Weather;
