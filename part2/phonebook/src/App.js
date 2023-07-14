import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 },
    { name: 'John Doe', phoneNumber: '99-876-543210', id: 5 },
    { name: 'Jane Smith', phoneNumber: '55-123-456789', id: 6 },
    { name: 'Alex Johnson', phoneNumber: '77-987-654321', id: 7 },
    { name: 'Emily Brown', phoneNumber: '88-234-567890', id: 8 },
    { name: 'Michael Wilson', phoneNumber: '66-345-678901', id: 9 },
    { name: 'Sarah Davis', phoneNumber: '44-567-890123', id: 10 },
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [lookingFor, setLookingFor] = useState('')

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
