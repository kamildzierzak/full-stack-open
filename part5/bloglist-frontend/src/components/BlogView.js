import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { like } from '../reducers/blogReducer'

const BlogView = ({ blog, user }) => {
  const dispatch = useDispatch()

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
    }
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
            remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default BlogView
