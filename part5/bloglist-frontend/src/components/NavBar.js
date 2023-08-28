import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const NavBar = ({ user, logoutHandler }) => {
  const dispatch = useDispatch()

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#AAA',
  }

  return (
    <div style={navStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <p>
        {user.name} logged in{' '}
        <button
          id="logout-button"
          onClick={() => dispatch(logoutHandler())}
          type="submit"
        >
          Logout
        </button>
      </p>
    </div>
  )
}

export default NavBar
