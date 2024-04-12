import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import ChartTracker from "./ChartTracker";
import Swal from "sweetalert2";
import TransactionList from "./TransactionList";

const API_BASE_URL = "https://eurasmus.onrender.com/api/v1"; 

const Tracker = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
  });

  const currentMonth = format(new Date(), "MMMM");
  const [transactions, setTransactions] = useState([]);
  const [chartKey, setChartKey] = useState(""); 
  const [firstTransactionAdded, setFirstTransactionAdded] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const handleList = () => {
    if (!showTransactions) {
      setShowTransactions(true);
    } else {
      setShowTransactions(false);
    }
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/get-transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("token");
        Swal.fire({
          text: "Your session has expired. Please login again.",
          icon: "info",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload();
        });
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && parseFloat(value) <= 0) {
      return Swal.fire({
        text: "Amount must be greater than 0!",
        icon: "info",
        confirmButtonText: "Cool",
      });
    }

    if (value.length > 16) {
      return Swal.fire({
        text: "The amount should not exceed 16 characters!",
        icon: "info",
        confirmButtonText: "Cool",
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/add-transaction`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      // Clean the form
      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "",
      });
      setChartKey(Math.random().toString(36).substring(7));

      // Check if this is the first transaction being added.
      if (!firstTransactionAdded) {
        fetchTransactions();
        setFirstTransactionAdded(true);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("token");
        Swal.fire({
          text: "Your session has expired. Please login again.",
          icon: "info",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          text: "Error adding transaction. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  const getCategoryOptions = () => {
    if (formData.type === "income") {
      return (
        <>
          <option value="">Select category</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Part-time Job">Part-time Job</option>
          <option value="Parental Support">Parental Support</option>
          <option value="Freelancing">Freelancing</option>
          <option value="Grants">Grants</option>
          <option value="Tutoring">Tutoring</option>
          <option value="Selling Stuff">Selling Stuff</option>
          <option value="Other Income">Other Income</option>
        </>
      );
    } else if (formData.type === "expense") {
      return (
        <>
          <option value="">Select category</option>
          <option value="Alcohol">Alcohol</option>
          <option value="Party">Party</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other Expense">Other Expense</option>
        </>
      );
    } else {
      return (
        <>
          <option value="">Select type first</option>
        </>
      );
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      {!showTransactions && (
        <Card
          style={{
            width: "40rem",
            borderRadius: "20px",
            marginTop: "4rem",
            marginBottom: "4rem",
          }}
          className="mx-auto"
        >
          <Card.Body>
            <Card.Title className="text-center" style={{ color: "#0D6EFD" }}>
              Money Tracker - {currentMonth}
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  className="mb-3"
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
                  className="mb-3"
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
                  className="mb-3"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength="17"
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
              {!showTransactions && (
                <Row>
                  <Col md={6} sm={12}>
                    <>
                      <hr style={{ margin: "20px 0" }} />
                      <ChartTracker
                        key="income"
                        type="income"
                        chartKey={chartKey}
                      />
                    </>
                  </Col>
                  <Col md={6} sm={12}>
                    <>
                      <hr style={{ margin: "20px 0" }} />
                      <ChartTracker
                        key="expense"
                        type="expense"
                        chartKey={chartKey}
                      />
                    </>
                  </Col>
                </Row>
              )}
            </Container>

            {transactions.length > 0 && !showTransactions && (
              <Button
                className="w-100 mt-3"
                variant="primary"
                onClick={handleList}
              >
                Show Transactions
              </Button>
            )}
          </Card.Body>
        </Card>
      )}

      {transactions.length > 0 && showTransactions && (
        <Row>
          <Col>
            <TransactionList
              transactions={transactions}
              onDelete={(id) => {
                setTransactions(
                  transactions.filter((transaction) => transaction._id !== id)
                );
              }}
              setShowTransactions={setShowTransactions}
              handleList={handleList}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Tracker;
