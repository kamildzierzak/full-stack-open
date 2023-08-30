import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const NavBar = ({ user, logoutHandler }) => {
  const dispatch = useDispatch()

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">__bloGG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/">
                Blogs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/users">
                Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="me-1">
            <Navbar.Text className="me-3">
              <b>{user.name}</b> logged in
            </Navbar.Text>
            <Button
              variant="outline-danger"
              id="logout-button"
              onClick={() => dispatch(logoutHandler())}
              type="submit"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
