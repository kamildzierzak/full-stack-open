import { Person } from './Person'
import personService from '../services/persons'

export const Persons = ({ personsToShow, setPersons, setMessage, newName }) => {
  const deleteHandler = id => {
    const personToDelete = personsToShow.find(person => person.id === id)
    const result = window.confirm(
      `Do you really want to delete ${personToDelete.name}?`
    )

    if (result) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(personsToShow.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessage({
            text: `Information of ${newName} has already been removed from server`,
            type: 'error',
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setPersons(personsToShow.filter(person => person.id !== id))
        })
    }
  }

  return (
    <>
      {personsToShow.map(person => (
        <Person
          key={person.id}
          person={person}
          deleteHandler={() => deleteHandler(person.id)}
        />
      ))}
    </>
  )
}
