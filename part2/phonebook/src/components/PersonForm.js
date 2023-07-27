import personService from '../services/persons'

export const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNameHandler,
  newPhoneNumber,
  setNewPhoneNumber,
  newPhoneNumberHandler,
  setMessage,
}) => {
  const addPerson = event => {
    event.preventDefault()
    const personToUpdate = persons.find(person => person.name === newName)

    if (personToUpdate) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (result) {
        const personObject = { ...personToUpdate, phoneNumber: newPhoneNumber }

        personService
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            setMessage({
              text: `Person ${personToUpdate.name} was updated successfully`,
              type: 'success',
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setPersons(
              persons.map(person =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )
          })
          .catch(error => {
            // TODO handle missing number error
            setMessage({
              text: `Information of ${personToUpdate.name} has already been removed from server`,
              type: 'error',
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setPersons(
              persons.filter(person => person.id !== personToUpdate.id)
            )
          })
      }
    } else {
      const personObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
      }

      personService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewPhoneNumber('')
          setMessage({
            text: `Added ${personObject.name}`,
            type: 'success',
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage({
            text: error.response.data.error,
            type: 'error',
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
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
