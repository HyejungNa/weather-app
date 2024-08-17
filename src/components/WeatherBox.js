import React from 'react';

const WeatherBox = ({ weather }) => {
  console.log(weather);

  const fahrenheit = weather?.main.temp * 1.8 + 32;

  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp}°C /{fahrenheit.toFixed(2)}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
