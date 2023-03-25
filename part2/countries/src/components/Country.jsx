import { useEffect } from "react";
import { useState } from "react";
import getWeather from "../services/weather";

const Country = ({ unique, country: { name, area, capital, languages, flags } }) => {
  const [showCountry, setShowCountry] = useState(false)
  const [weather, setWeather] = useState(null)
  const iconUrl = icon => `https://openweathermap.org/img/wn/${icon}@2x.png`

  useEffect(() => {
    getWeather(capital).then(data => setWeather(data))
  }, [capital])

  if(!unique && !showCountry) return (
    <div>
        <h4>{name.common}</h4>
        <button onClick={() => setShowCountry(!showCountry)}>{showCountry ? 'hide' : 'show'}</button>
    </div>
  )

  return (
    <div>
      <h2>{name.common}</h2>
      { !unique && <button onClick={() => setShowCountry(!showCountry)}>{showCountry ? 'hide' : 'show'}</button> }
      <p>Area: {area}</p>
      {capital && <p>Capital: {capital[0]}</p>}
      <p>Languages</p>
      <ul>
        {languages &&
          Object.values(languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>
      <img src={flags.png} alt={name.common} />
      <h2>Weather in {capital}</h2>
      { 
        weather 
        ? <div>
            <p>{weather.weather[0].description}</p>
            <img src={iconUrl(weather.weather[0].icon)} alt="" />
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)}° Celsius</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
        : null
    }
    </div>
  );
};

export default Country;
