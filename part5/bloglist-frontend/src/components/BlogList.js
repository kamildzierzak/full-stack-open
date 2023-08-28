import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>
      <br />
      <div id="blogs">
        {[...blogs]
          .sort((blogA, blogB) => blogB.likes - blogA.likes)
          .map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <Blog blog={blog} />
            </Link>
          ))}
      </div>
    </>
  )
}

export default BlogList
