import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader

const WeatherBox = ({ weather, loading }) => {
  // console.log(weather);

  if (loading || !weather || !weather.main) {
    return <ClipLoader color='#f88c6b' loading={loading} size={150} />;
  }

  const fahrenheit = weather?.main.temp * 1.8 + 32;

  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp}°C / {fahrenheit.toFixed(1)}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
