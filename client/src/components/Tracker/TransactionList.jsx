import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import "./transactionList.css"; // Importa il foglio di stile CSS

const API_BASE_URL = "https://eurasmus.onrender.com/api/v1";

const TransactionList = ({ transactions, onDelete, handleList }) => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/delete-transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(id);

      if (transactions.length === 1) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Error deleting transaction. Please try again.");
    }
  };

  const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');
  const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');

  return (
    <Card className="mx-auto mt-3">
      <div className="transaction-list">
        <Row>
          <Col md={12} sm={12}>
            <div className="incomes-type">
              <h2 className="text-primary text-center mt-3">Incomes</h2>
              <Table hover responsive className="transaction-table transaction-table-wrapper">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeTransactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{transaction.title}</td>
                      <td>{transaction.category}</td>
                      <td>€{transaction.amount}</td>
                      <td>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(transaction._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md={12} sm={12}>
            <div className="transactions-type">
              <h2 className="text-danger text-center mt-3">Expenses</h2>
              <Table hover responsive className="transaction-table transaction-table-wrapper">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseTransactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{transaction.title}</td>
                      <td>{transaction.category}</td>
                      <td>€{transaction.amount}</td>
                      <td>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(transaction._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="mt-3">
        <Col className="text-center">
          <Button variant="primary" className="w-100 mt-3" onClick={handleList}>
            Hide Transactions
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TransactionList;
