import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleCreate = async event => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url,
      }

      await blogService.create(newBlog)

      setMessage({
        text: `a new blog ${title} by ${author} added`,
        type: 'success',
      })

      setTitle('')
      setAuthor('')
      setUrl('')

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

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
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

  const createBlog = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )

  if (user === null) {
    return loginForm()
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
      {createBlog()}
      <br />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
