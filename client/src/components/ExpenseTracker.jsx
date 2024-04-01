import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";
import axios from "axios"; // Assuming you are using axios for HTTP requests
import ChartTracker from './ChartTracker';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(""); // Changed variable name to 'price'
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const categories = ["Food", "Travel", "Shopping", "Utilities"];

  const aggregatedExpenses = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.category === expense.category);
    if (existingCategory) {
      existingCategory.price += expense.price; // Changed property name to 'price'
    } else {
      acc.push({ category: expense.category, price: expense.price }); // Changed property name to 'price'
    }
    return acc;
  }, []);

  const chartData = {
    labels: aggregatedExpenses.map(expense => expense.category),
    price: aggregatedExpenses.map(expense => expense.price) // Changed property name to 'price'
  };


  useEffect(() => {
    fetchExpenses();
  }, []);

  const BASE_URL = "http://localhost:8080";

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/get-expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !price || !selectedCategory || !description || !date) { // Changed variable name to 'price'
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/add-expense`, {
        title,
        price,
        category: selectedCategory,
        description,
        date,
      });
      fetchExpenses(); // Refresh the list of expenses
      setTitle("");
      setPrice("");
      setSelectedCategory("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Failed to add expense", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/delete-expense/${id}`);
      fetchExpenses(); // Refresh the list after delete
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  return (
    <Card style={{ width: "30rem", margin: "20px auto" }}>
      <Card.Body>
        <Card.Title>Expense Tracker</Card.Title>
        <Form onSubmit={handleAddExpense}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter expense title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label> {/* Changed label to 'Price' */}
            <Form.Control
              type="number"
              placeholder="Enter price" 
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category...</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </Form>

        <ListGroup variant="flush">
          {expenses.map((expense) => (
            <ListGroup.Item key={expense._id}>
              {expense.title} - ${expense.price} {/* Changed variable name to 'price' */}
              <Button
                variant="danger"
                size="sm"
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteExpense(expense._id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <ChartTracker data={chartData} />
      </Card.Body>
    </Card>
  );
};

export default ExpenseTracker;
