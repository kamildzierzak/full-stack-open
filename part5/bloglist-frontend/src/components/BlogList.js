import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = (user) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div id="blogs">
      {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default BlogList
