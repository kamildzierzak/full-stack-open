export const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNameHandler,
  newPhoneNumber,
  setNewPhoneNumber,
  newPhoneNumberHandler,
}) => {
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

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={newNameHandler} />
      </div>
      <div>
        number:{' '}
        <input value={newPhoneNumber} onChange={newPhoneNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
