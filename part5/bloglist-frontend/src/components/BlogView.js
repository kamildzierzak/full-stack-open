import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { like } from '../reducers/blogReducer'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const BlogView = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const likeBlog = (blog) => {
    dispatch(like(blog.id))
  }

  const removeBlog = (blog) => {
    const result = window.confirm(
      `Do you really want to remove ${blog.name} by ${blog.author}?`,
    )

    if (result) {
      const id = blog.id
      dispatch(deleteBlog(id))
      dispatch(
        setNotification(
          {
            text: `blog with id: ${id} has been deleted`,
            type: 'success',
          },
          5,
        ),
      )
      navigate('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const id = blog.id

    dispatch(createComment(id, { comment }))
    setComment('')
  }

  const deleteButtonStyle = {
    backgroundColor: '#ff0040 ',
  }

  if (!blog || !user) {
    return null
  }

  return (
    <Container className="mt-3">
      <h2>{blog.title}</h2>
      <Container className="blogDetailedInfo p-0">
        <Row className="align-items-center mt-3 h5">
          <Col>
            <a href={'https://' + blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </Col>
          <Col className="text-end">
            {blog.likes} likes
            <Button
              className="ms-3"
              id="likeButton"
              onClick={() => likeBlog(blog)}
            >
              Like
            </Button>
          </Col>
        </Row>
        <Row className="align-items-center mt-3">
          <Col>added by {blog.user.name}</Col>
          {user.username === blog.user.username ? (
            <Col className="text-end">
              <Button
                id="deleteButton"
                style={deleteButtonStyle}
                onClick={() => removeBlog(blog)}
                variant="danger"
              >
                Remove
              </Button>
            </Col>
          ) : null}
        </Row>
      </Container>
      <Form onSubmit={addComment} className="mt-5 d-flex flex-column">
        <Form.Control
          type="text"
          value={comment}
          name="Comment"
          placeholder="Write a comment"
          onChange={({ target }) => setComment(target.value)}
        ></Form.Control>
        <div className="d-flex justify-content-end">
          <Button type="submit" className="mt-3">
            Add comment
          </Button>
        </div>
      </Form>
      {blog.comments ? (
        <>
          <h3 className="mt-3">Comments</h3>
          <ListGroup>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li> //not reccomended to use index as key but i'll leave it 4now
            ))}
          </ListGroup>
        </>
      ) : null}
    </Container>
  )
}

export default BlogView
