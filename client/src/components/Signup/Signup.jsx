import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error
    setLoading(true); 

    const { password, confirmPassword } = formData;

    // Check password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.");
      setLoading(false); 
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false); 
      return;
    }

    try {
      const response = await axios.post("https://eurasmus.onrender.com/api/v1/register", formData);
      if (!response.data.success) {
        setError(response.data.message);
      } else {
        // Registration successful, redirect to login page
        Swal.fire({
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        navigate("/login");
      }
    } catch (error) {
      setError("An error occurred while processing your request");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container style={{ marginTop: "15rem", height: "58vh" }}>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}> 
              {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"} 
            </Button>
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/login">Log in here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
