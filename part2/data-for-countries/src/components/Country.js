import { useState, useEffect } from 'react'
import axios from 'axios'

export const Country = ({ country, show }) => {
  const [showCountry, setShowCountry] = useState(show)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (showCountry) {
      const api_key = process.env.REACT_APP_OPEN_WEATHER_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${api_key}&units=metric`
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [showCountry])

  const handleShowClick = () => {
    setShowCountry(!showCountry)
  }

  if (showCountry) {
    let name = country.name.common
    let capital =
      country.capital && country.capital[0] ? country.capital[0] : 'No capital'
    let area = country.area
    let languages = Object.values(country.languages)
    let flag = country.flags.png
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
    const name = country.name.common
    return (
      <>
        <p>
          {name} <button onClick={handleShowClick}>show</button>
        </p>
      </>
    )
  }
}
