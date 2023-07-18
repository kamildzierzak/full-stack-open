import { Country } from './Country'

export const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} show={true} />
  } else if (countries.length > 10) {
    return <p>{'Too many matches, specify another filter'}</p>
  } else {
    return countries.map(country => {
      return (
        <Country key={country.name.common} country={country} show={false} />
      )
    })
  }
}
