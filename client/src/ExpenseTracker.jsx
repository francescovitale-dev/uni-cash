import { useState, useEffect } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";
import axios from "axios"; // Assuming you are using axios for HTTP requests

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

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
    if (!title || !amount || !category || !description || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/add-expense`, {
        title,
        amount,
        category,
        description,
        date,
      });
      fetchExpenses(); // Refresh the list of expenses
      setTitle("");
      setAmount("");
      setCategory("");
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
    <Card style={{ width: "30rem", margin: "0 auto", marginTop: "20px" }}>
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

          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category (e.g., Food, Travel)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
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
              {expense.title} - ${expense.amount}
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
      </Card.Body>
    </Card>
  );
};

export default ExpenseTracker;
