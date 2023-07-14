import { useState } from 'react'

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

  const addPerson = event => {
    event.preventDefault()
    if (
      persons.some(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
        id: persons.length + 1,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhoneNumber('')
    }
  }

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
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input value={lookingFor} onChange={handleLookingForInputChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number:{' '}
          <input
            value={newPhoneNumber}
            onChange={handlePhoneNumberInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.phoneNumber}
        </div>
      ))}
    </div>
  )
}

export default App
