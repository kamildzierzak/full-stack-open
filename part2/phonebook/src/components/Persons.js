import { Person } from './Person'
import personService from '../services/persons'

export const Persons = ({ personsToShow, setPersons }) => {
  const deleteHandler = id => {
    const person = personsToShow.find(person => person.id === id)
    const result = window.confirm(
      `Do you really want to delete ${person.name}?`
    )

    if (result) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(personsToShow.filter(person => person.id !== id))
        })
        .catch(error => {
          alert('The person was already deleted from the server')
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
