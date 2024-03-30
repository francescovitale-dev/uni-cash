import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ExpenseTracker from './components/ExpenseTracker';
import IncomeTracker from './components/IncomeTracker';
import ChartTracker from './components/ChartTracker'; // Importa il componente del grafico

function HomePage() {

  // const chartData = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   amounts: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
  // };

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
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <ChartTracker />{/* data={chartData} /> Passa i dati al componente del grafico */}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
