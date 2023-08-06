import { useState } from 'react'
import { Notification } from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    loginUser({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  message: PropTypes.object,
}

export default LoginForm
