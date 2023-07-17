export const Filter = ({ lookingFor, lookingForHandler }) => {
  return (
    <div>
      find countries <input value={lookingFor} onChange={lookingForHandler} />
    </div>
  )
}
