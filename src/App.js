import './App.css';
import Search from './Components/search/search';
import Forecast from './Components/forecast/forecast';
import CurrentWeather from './Components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Components/api";
import { useState } from 'react';

function App() {

  const[currentWeather, setCurrentWeather] = useState(null);
  const[forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);


   Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse});
        setForecast({ city: searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container">
      <h3 className="headdingH3">Welcome to my weather application</h3>
      <h5 className="headdingH5">Check for anywhere in the world</h5>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}

      <h2 className="headdingEnd">Created by Navneet</h2>
    </div>
  );
}

export default App;
