import { useRef } from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>
      <br />
      <Container>
        <ListGroup id="blogs" as="ol" numbered>
          {[...blogs]
            .sort((blogA, blogB) => blogB.likes - blogA.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </ListGroup>
      </Container>
    </>
  )
}

export default BlogList
