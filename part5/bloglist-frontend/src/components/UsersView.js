import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

const UsersView = () => {
  const users = useSelector((state) => state.users)

  return (
    <Container>
      <h2 className="mt-3">Users</h2>
      <Table striped className="mt-3">
        <tbody>
          <tr>
            <th></th>
            <th>Created blogs</th>
          </tr>
          {[...users].map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default UsersView
