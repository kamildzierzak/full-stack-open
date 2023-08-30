import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const UserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Container className="mt-3">
      <h2>{user.name}</h2>
      <h4 className="ms-1 mt-3">Added blogs:</h4>
      <ListGroup className="mt-3" as="ol" numbered>
        {user.blogs.map((b) => {
          return <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>
        })}
      </ListGroup>
    </Container>
  )
}

export default UserView
