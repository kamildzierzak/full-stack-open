import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/Filter'
import { Countries } from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [lookinFor, setLookingFor] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleLookingForInputChange = event => {
    setLookingFor(event.target.value)
    setFilteredCountries(
      countries.filter(country => {
        return country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      })
    )
  }

  return (
    <>
      <Filter
        lookingFor={lookinFor}
        lookingForHandler={handleLookingForInputChange}
      />
      <Countries countries={filteredCountries} />
    </>
  )
}

export default App
