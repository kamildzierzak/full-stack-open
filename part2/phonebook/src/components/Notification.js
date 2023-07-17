export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="info">{message}</div>
}
