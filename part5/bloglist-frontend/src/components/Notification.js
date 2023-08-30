import { useSelector } from 'react-redux'
// import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

export const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.text === '') {
    return null
  }

  if (notification.type === 'success') {
    return <Alert variant="success">{notification.text}</Alert>
  }

  if (notification.type === 'error') {
    return <Alert variant="danger">{notification.text}</Alert>
  }
}

export default Notification
