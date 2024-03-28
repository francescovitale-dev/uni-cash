import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" variant="light" fixed="top" className="mb-3">
      <Container fluid>
        {/* Utilizza Link di react-router-dom all'interno di Navbar.Brand per la navigazione */}
        <Navbar.Brand to="/" className="mx-auto">idk</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
