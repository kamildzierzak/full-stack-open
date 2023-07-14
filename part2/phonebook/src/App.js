import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

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
        id: persons.length + 1,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleInputChange = event => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  )
}

export default App
