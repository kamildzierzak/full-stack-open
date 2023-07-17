import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [lookingFor, setLookingFor] = useState('')
  const [message, setMessage] = useState(null)

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
    return person.name.toLowerCase().includes(lookingFor.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        setPersons={setPersons}
        setMessage={setMessage}
        newName={newName}
      />
    </div>
  )
}

export default App
