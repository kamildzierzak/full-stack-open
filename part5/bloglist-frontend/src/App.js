import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Notification } from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import NavBar from './components/NavBar'
import { initializeBlogs } from './reducers/blogReducer'
import { setUserFromLocalStorage, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

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

  const userById = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null

  const blogById = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <NavBar user={user} logoutHandler={logoutUser} />
      <Notification />
      <h2>blog app</h2>
      <Routes>
        <Route path="/users/:id" element={<UserView user={userById} />} />
        <Route path="/users" element={<UsersView />} />
        <Route
          path="/blogs/:id"
          element={<BlogView blog={blogById} user={user} />}
        />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
