import { useState } from 'react'
import { Notification } from './Notification'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))

    setUsername('')
    setPassword('')
  }

  return (
    <Container className="mt-5">
      <Notification />
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            placeholder="Enter username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>

        <Button id="login-button" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default LoginForm
