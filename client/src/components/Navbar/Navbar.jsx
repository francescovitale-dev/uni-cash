import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import './navbar.css';

function Header({ authenticated, setAuthenticated }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="primary" variant="dark" fixed="top" className="mb-3 shadow">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="title">Eurasmus</Navbar.Brand>
        <Nav className="ml-auto">
          {authenticated ? (
            <Nav.Link onClick={handleLogout} className="logout">Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Log in</Nav.Link> 
              <Nav.Link as={Link} to="/signup" className="logout">Sign up</Nav.Link> 
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
