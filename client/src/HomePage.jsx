import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tracker from './components/Tracker/Tracker';

function HomePage() {

  // const chartData = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   amounts: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
  // };

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
