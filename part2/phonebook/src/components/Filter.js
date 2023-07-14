export const Filter = ({ lookingFor, lookingForHandler }) => {
  return (
    <div>
      filter shown with{' '}
      <input value={lookingFor} onChange={lookingForHandler} />
    </div>
  )
}
