import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './header.css';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" fixed="top" className="mb-3" style={{ marginBottom: '20px' }}>
      <Container fluid>
        <Navbar.Brand href="/" className="title">Eurasmus</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/login">Log in</Nav.Link>
          <Nav.Link href="/signup" className="logout">Sign up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
