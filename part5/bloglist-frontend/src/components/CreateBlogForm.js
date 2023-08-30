import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateBlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(
      createBlog({
        title,
        author,
        url,
      }),
    )
    dispatch(
      setNotification(
        {
          text: `a new blog ${title} by ${author} added`,
          type: 'success',
        },
        5,
      ),
    )

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2 className="mt-3">Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            placeholder="Enter title"
            onChange={({ target }) => setTitle(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            placeholder="Enter author"
            onChange={({ target }) => setAuthor(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="Url"
            placeholder="Enter url"
            onChange={({ target }) => setUrl(target.value)}
          ></Form.Control>
        </Form.Group>
        <Button id="create-button" type="submit" className="mt-1">
          Create
        </Button>
      </Form>
    </>
  )
}

export default CreateBlogForm
