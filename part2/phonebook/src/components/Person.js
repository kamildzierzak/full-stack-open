export const Person = ({ person, deleteHandler }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}{' '}
      <button onClick={deleteHandler}>delete</button>
    </div>
  )
}
