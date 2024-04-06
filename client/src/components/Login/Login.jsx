import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Cambiato da 'email' a 'identifier'
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await axios.post("https://eurasmus.onrender.com/api/v1/login", { identifier, password }); // Cambiato 'email' a 'identifier'
      localStorage.setItem("token", response.data.token);
      navigate("/tracker");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while processing your request");
        console.error(error);
      }
    }
  };

  return (
    <Container style={{ marginTop: "12rem", marginBottom: "3rem" }}>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicIdentifier" className="mb-3"> {/* Cambiato 'formBasicEmail' a 'formBasicIdentifier' */}
              <Form.Control 
                type="text" // Cambiato da 'email' a 'text'
                placeholder="Enter email or username" // Modificato il placeholder
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
