export const Person = ({ person }) => {
  return (
    <div key={person.id}>
      {person.name} {person.phoneNumber}
    </div>
  )
}
