import { useState, useEffect } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";
import axios from "axios"; // Assuming you are using axios for HTTP requests
import ChartTracker from './ChartTracker';

const IncomeTracker = () => {
  const [incomes, setIncomes] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setprice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const categories = ["Food", "Travel", "Shopping", "Utilities"];

  const aggregatedIncomes = incomes.reduce((acc, incomes) => {
    const existingCategory = acc.find(item => item.category === incomes.category);
    if (existingCategory) {
      existingCategory.price += incomes.price; // Changed property name to 'price'
    } else {
      acc.push({ category: incomes.category, price: incomes.price }); // Changed property name to 'price'
    }
    return acc;
  }, []);

  const chartData = {
    labels: aggregatedIncomes.map(incomes => incomes.category),
    price: aggregatedIncomes.map(incomes => incomes.price) // Changed property name to 'price'
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const BASE_URL = "http://localhost:8080";

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/get-incomes`);
      console.log(response.data); // Add this line to log the response data
      setIncomes(response.data);
    } catch (error) {
      console.error("Failed to fetch incomes", error);
    }
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    if (!title || !price || !selectedCategory || !description || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/add-income`, {
        title,
        price,
        category: selectedCategory,
        description,
        date,
      });
      fetchIncomes(); // Refresh the list of incomes
      setTitle("");
      setprice("");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Failed to add income", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/delete-income/${id}`);
      fetchIncomes(); // Refresh the list after delete
    } catch (error) {
      console.error("Failed to delete income", error);
    }
  };

  return (
    <Card style={{ width: "30rem", margin: "0 auto", marginTop: "20px" }}>
      <Card.Body>
        <Card.Title>Income Tracker</Card.Title>
        <Form onSubmit={handleAddIncome}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formprice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
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
              placeholder="Enter description"
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
            Add Income
          </Button>
        </Form>

        <ListGroup variant="flush">
          {Array.isArray(incomes) &&
            incomes.map((income) => (
              <ListGroup.Item key={income._id}>
                {income.title} - ${income.price}
                <Button
                  variant="danger"
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDeleteIncome(income._id)}
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

export default IncomeTracker;
