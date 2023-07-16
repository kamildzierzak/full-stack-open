import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [lookingFor, setLookingFor] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameInputChange = event => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberInputChange = event => {
    setNewPhoneNumber(event.target.value)
  }

  const handleLookingForInputChange = event => {
    setLookingFor(event.target.value)
  }

  const personsToShow = persons.filter(person => {
    // return person.name.toLowerCase().startsWith(lookingFor.toLowerCase())
    return person.name.toLowerCase().includes(lookingFor.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        lookingFor={lookingFor}
        lookingForHandler={handleLookingForInputChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        newNameHandler={handleNameInputChange}
        setNewName={setNewName}
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber}
        newPhoneNumberHandler={handlePhoneNumberInputChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
