import { Country } from './Country'

export const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length === 1) {
    const name = countriesToShow[0].name.common
    const capital = countriesToShow[0].capital[0]
    const area = countriesToShow[0].area
    const languages = Object.values(countriesToShow[0].languages)
    const flag = countriesToShow[0].flags.png

    return (
      <Country
        name={name}
        capital={capital}
        area={area}
        languages={languages}
        flag={flag}
      />
    )
  } else if (countriesToShow.length > 10) {
    return <p>{'Too many matches, specify another filter'}</p>
  } else {
    return countriesToShow.map(country => {
      return <div key={country.name.common}>{country.name.common}</div>
    })
  }
}
