import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Qui gestisci il login dell'utente, ad esempio tramite chiamata API
    // Dopo il login, reindirizza l'utente alla pagina desiderata
    // Utilizza il componente history di react-router-dom o altre tecniche di gestione della navigazione
  };

  return (
    <Container style={{ marginTop: "12rem", marginBottom: "3rem" }}>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} >
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <p className="mt-3 text-center">
              Not registered yet?{" "}
              <Link to="/signup">Sign up here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
