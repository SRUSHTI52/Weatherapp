import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomTextField from './CustomTextfield';
import './App.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const APIKEY = '28b83cbf6a9b40219b3bbee1ad5589cd';
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=${APIKEY}`
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
    fetchData();
  };

  return (
    <>
    <div className="weather-container" >
      <form onSubmit={handleSubmit} className='cuform'>
        <CustomTextField />
      </form>
    </div>
    <button className="get" type="submit">Get Weather</button>

    </>
  );
}

export default Weather;
