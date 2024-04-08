import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link e useNavigate da react-router-dom
import './navbar.css';

function Header({ authenticated, setAuthenticated }) {
  const navigate = useNavigate(); // Crea una variabile navigate usando useNavigate()

  const handleLogout = () => {
    // Rimuovi l'informazione di autenticazione
    setAuthenticated(false);
    // Rimuovi il token dal localStorage
    localStorage.removeItem("token");
    // Reindirizza l'utente alla pagina di login usando navigate()
    navigate("/login");
  };

  return (
    <Navbar bg="primary" variant="dark" fixed="top" className="mb-3 shadow" style={{ marginBottom: '20px' }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="title">Eurasmus</Navbar.Brand>
        <Nav className="ml-auto">
          {authenticated ? (
            <Nav.Link onClick={handleLogout} className="logout">Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Log in</Nav.Link> {/* Usa Link per reindirizzare */}
              <Nav.Link as={Link} to="/signup" className="logout">Sign up</Nav.Link> {/* Usa Link per reindirizzare */}
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
