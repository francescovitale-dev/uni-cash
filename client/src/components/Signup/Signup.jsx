import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link component for redirection

const Signup = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    // Handle user signup here, e.g., via API call
    // After signup, redirect the user to the desired page
    // Utilize react-router-dom's history component or other navigation handling techniques
  };

  return (
    <Container style={{ marginTop: "12rem", marginBottom: "3rem" }}>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
            {/* Add a link to the login page */}
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
