import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div id="blogs">
      {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <Blog blog={blog} />
          </Link>
        ))}
    </div>
  )
}

export default BlogList
