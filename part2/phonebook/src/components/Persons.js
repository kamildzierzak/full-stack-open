import { Person } from './Person'

export const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </>
  )
}
