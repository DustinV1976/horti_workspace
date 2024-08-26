import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/signup/">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/login/">Log In</Nav.Link>
            <Button variant="outline-danger">Log Out</Button>
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;