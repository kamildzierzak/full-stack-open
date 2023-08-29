import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { like } from '../reducers/blogReducer'

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
    <div>
      <h2>{blog.title}</h2>
      <div className="blogDetailedInfo">
        <a href={'https://' + blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <p>
          {blog.likes} likes{' '}
          <button id="likeButton" onClick={() => likeBlog(blog)}>
            like
          </button>
        </p>
        <p>added by {blog.user.name}</p>
        {user.username === blog.user.username ? (
          <button
            id="deleteButton"
            style={deleteButtonStyle}
            onClick={() => removeBlog(blog)}
          >
            remove blog
          </button>
        ) : null}
        <div>
          <form onSubmit={addComment}>
            <input
              type="text"
              value={comment}
              name="Comment"
              placeholder="write a comment"
              onChange={({ target }) => setComment(target.value)}
            ></input>
            <button type="submit">add comment</button>
          </form>
        </div>
        {blog.comments ? (
          <>
            <h3>comments</h3>
            <ul>
              {blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li> //not reccomended to use index as key but i'll leave it 4now
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default BlogView
