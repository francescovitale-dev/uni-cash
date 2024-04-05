import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await axios.post("https://eurasmus.onrender.com/api/v1/login", { email, password });
      localStorage.setItem("token", response.data.token); // Salva il token JWT nel localStorage
      navigate("/tracker"); // Reindirizza l'utente alla pagina 'Tracker'
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Gestisce gli errori di login
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
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
