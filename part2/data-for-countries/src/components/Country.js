import { useState } from 'react'

export const Country = ({ country, show }) => {
  const [showCountry, setShowCountry] = useState(show)
  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const languages = Object.values(country.languages)
  const flag = country.flags.png

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
