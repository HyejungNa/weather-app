import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('melbourne');
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState('');
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4d6be8beaba2b686ca915803de9815b&units=metric
      `;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4d6be8beaba2b686ca915803de9815b&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === 'current') {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  // useEffect(() => {
  //   if (city == null) {
  //     setLoading(true);
  //     getCurrentLocation();
  //   } else {
  //     setLoading(true);
  //     getWeatherByCity();
  //   }
  // }, [city]);
  //    melbourne default 날씨 없이 사용시 맨처음 화면에 현재위치날씨 데이터가 받아지지않음

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);
  //    melbourne default 날씨 없이 사용시 current location버튼 클릭시 현재위치날씨 데이터가 받아지지않음

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader color='#f88c6b' loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className='container'>
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
