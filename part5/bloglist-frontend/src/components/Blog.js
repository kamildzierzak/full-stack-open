import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

const Blog = ({ blog }) => {
  return (
    <ListGroup.Item
      as={Link}
      to={`/blogs/${blog.id}`}
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{blog.title}</div>
        {blog.author}
      </div>
      <Badge bg="primary" pill>
        {blog.likes} likes
      </Badge>
    </ListGroup.Item>
  )
}

export default Blog
