import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, handleCityChange }) => {
  console.log('cities', cities);

  return (
    <div className='weather-button-box'>
      <Button variant='warning' onClick={() => handleCityChange('current')}>
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          variant='warning'
          key={index}
          onClick={() => handleCityChange(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
