import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div className='weather-button-box'>
      <Button variant='info'>Current Location</Button>
      <Button variant='info'>paris</Button>
      <Button variant='info'>new york</Button>
    </div>
  );
};

export default WeatherButton;
