import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import ChartTracker from "./ChartTracker";

const API_BASE_URL = "http://localhost:8080/api/v1"; // Assicurati di sostituire con il tuo URL API

const Tracker = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/add-transaction`, formData);
      // Pulisce il form dopo l'invio
      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Error adding transaction. Please try again.");
    }
  };

  // Categorie dinamiche in base al tipo selezionato
  const getCategoryOptions = () => {
    if (formData.type === "income") {
      return (
        <>
          <option value="">Select category</option>
          <option value="Salary">Salary</option>
          <option value="Bonus">Bonus</option>
          <option value="Other Income">Other Income</option>
        </>
      );
    } else if (formData.type === "expense") {
      return (
        <>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other Expense">Other Expense</option>
        </>
      );
    } else {
      return <option value="">Select type first</option>;
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Card style={{ width: "40rem" }} className="mx-auto">
        <Card.Body>
          <Card.Title className="text-center">Money Tracker</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {getCategoryOptions()}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button className="w-100 mt-3" variant="primary" type="submit">
              Add Transaction
            </Button>
          </Form>
          <Container>
            <Row>
              <Col md={6} sm={12}>
              <hr style={{ margin: '20px 0' }} />
                <ChartTracker type="income" />
              </Col>
              <Col md={6} sm={12}>
              <hr style={{ margin: '20px 0' }} />
                <ChartTracker type="expense" />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Tracker;
