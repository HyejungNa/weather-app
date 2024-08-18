import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4d6be8beaba2b686ca915803de9815b&units=metric
`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4d6be8beaba2b686ca915803de9815b&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const handleCityChange = (city) => {
    if (city === 'current') {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader color='#f88c6b' loading={loading} size={150} />
        </div>
      ) : (
        <div className='container'>
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      )}
    </div>
  );
}

export default App;
