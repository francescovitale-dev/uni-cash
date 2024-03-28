import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ExpenseTracker from './ExpenseTracker';
import IncomeTracker from './IncomeTracker';

function HomePage() {
  return (
    <Container className="content-top-padding">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <ExpenseTracker />
        </Col>
        <Col xs={12} md={6}>
          <IncomeTracker />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
