import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './landingPage.css'; // Assicurati di avere il file CSS per lo stile della landing page

function LandingPage() {
  return (
    <div>
      <Container className="landing-page-container">
        <Row className="text-center">
          <Col>
            <h1>Welcome to Eurasmus Party Tracker!</h1>
            <p className="lead">
              Track your expenses and party moments during your Erasmus adventure.
            </p>
            <Button href="/signup" variant="primary">Sign Up</Button>{' '}
            <Button href="/login" variant="outline-primary">Log In</Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>Keep Track of Your Party Expenses</h2>
            <p>
              Whether it's buying alcohol, organizing a party, or enjoying other fun activities, Eurasmus Party Tracker helps you manage your budget efficiently.
            </p>
          </Col>
          <Col>
            <img src="party.jpg" alt="Party Expenses" className="img-fluid" />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <img src="party.jpg" alt="Erasmus Friends" className="img-fluid" />
          </Col>
          <Col>
            <h2>Connect with Friends</h2>
            <p>
              Share your party moments with friends, see what they're up to, and plan your next Erasmus adventures together!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
