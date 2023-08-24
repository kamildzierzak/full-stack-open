import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { like } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visibleDetails, setVisibleDetails] = useState(false)

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteButtonStyle = {
    backgroundColor: '#ff0040 ',
  }

  return (
    <div style={blogStyle}>
      <div className="blogBasicInfo">
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisibleDetails(!visibleDetails)}>view</button>
      </div>
      {visibleDetails && (
        <div className="blogDetailedInfo">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button id="likeButton" onClick={() => likeBlog(blog)}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {user.user.username === blog.user.username ? (
            <button
              id="deleteButton"
              style={deleteButtonStyle}
              onClick={() => removeBlog(blog)}
            >
              remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog
