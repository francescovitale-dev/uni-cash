import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tracker from './components/Tracker/Tracker';

function HomePage() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Tracker />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
