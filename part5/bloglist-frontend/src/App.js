import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Notification } from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UsersView from './components/UsersView'
import { initializeBlogs } from './reducers/blogReducer'
import { setUserFromLocalStorage, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [user, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserFromLocalStorage(user))
    }
  }, [dispatch])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button
          id="logout-button"
          onClick={() => dispatch(logoutUser())}
          type="submit"
        >
          Logout
        </button>
      </p>
      <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>
      <br />
      <Routes>
        <Route path="/users" element={<UsersView />} />
        <Route path="/" element={<BlogList user={user} />} />
      </Routes>
    </div>
  )
}

export default App
