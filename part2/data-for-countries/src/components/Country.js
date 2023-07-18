import { useState, useEffect } from 'react'
import axios from 'axios'

export const Country = ({ country, show }) => {
  const [showCountry, setShowCountry] = useState(show)
  const [weather, setWeather] = useState(null)
  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const languages = Object.values(country.languages)
  const flag = country.flags.png

  useEffect(() => {
    if (showCountry) {
      const api_key = process.env.REACT_APP_OPEN_WEATHER_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [showCountry, name])

  const handleShowClick = () => {
    setShowCountry(!showCountry)
  }

  if (showCountry) {
    return (
      <>
        <hr />
        <h2>{name}</h2>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <h3>languages</h3>
        <ul>
          {languages.map(language => {
            return <li key={language}>{language}</li>
          })}
        </ul>
        <img src={flag} alt={name + ' flag'} width="100" height="100" />
        <h2>Weather in {name}</h2>
        {weather ? (
          <>
            <p>temperature {weather.main.temp} Celsius</p>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={name + ' weather icon'}
            />
            <p>wind {weather.wind.speed} m/s</p>
          </>
        ) : (
          <p>{'Waiting for weather...'}</p>
        )}
        <hr />
      </>
    )
  } else {
    return (
      <>
        <p>
          {name} <button onClick={handleShowClick}>show</button>
        </p>
      </>
    )
  }
}
