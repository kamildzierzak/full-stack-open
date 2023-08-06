import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage({
        text: `Wrong username or password`,
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(exception)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)

      setMessage({
        text: 'You have been successfully logged out.',
        type: 'success',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      setMessage({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'success',
      })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({
        text: `Title, author and url must be provided`,
        type: 'error',
      })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(exception)
    }
  }

  if (user === null) {
    return <LoginForm loginUser={handleLogin} message={message} />
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout} type="submit">
          Logout
        </button>
      </p>
      <Togglable buttonLabel={'New note'} ref={blogFormRef}>
        <CreateBlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
