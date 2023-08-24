import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.text === '') {
    return null
  }

  return <div className={notification.type}>{notification.text}</div>
}

export default Notification
