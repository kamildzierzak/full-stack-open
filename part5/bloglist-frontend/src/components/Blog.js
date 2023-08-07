import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visibleDetails, setVisibleDetails] = useState(false)

  const incrementLikes = blog => {
    updateLikes(blog.id, {
      user: blog.user.id,
      likes: (blog.likes += 1),
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  const removeBlog = blog => {
    const result = window.confirm(
      `Do you really want to remove ${blog.name} by ${blog.author}?`
    )

    if (result) {
      deleteBlog(blog.id)
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
            <button onClick={() => incrementLikes(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username ? (
            <button style={deleteButtonStyle} onClick={() => removeBlog(blog)}>
              remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog
