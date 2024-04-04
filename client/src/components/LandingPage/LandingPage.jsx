import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './landingPage.css'; // Assicurati di importare il tuo file CSS personalizzato
import trackerPicture from '../../assets/img/trackerPicture.png';

const LandingPage = () => {
  return (
    <div>
      <section>
        <Container>
          <Card className="landing-page">
            <Card.Body>
              <Row className="gx-5 align-items-center justify-content-center justify-content-lg-between">
                <Col lg={5}>
                  <h2 className="display-4 lh-1 mb-4">Easy Budget Tracking</h2>
                  <p className="lead fw-normal text-muted mb-5 mb-lg-0">Whether it's buying alcohol, organizing a party, or enjoying other fun activities, Eurasmus Party Tracker helps you manage your budget efficiently. Say goodbye to budget worries and focus on making memories!</p>
                </Col>
                <Col sm={8} md={6}>
                  <div className="px-5 px-sm-0">
                    <Card.Img variant="top" src={trackerPicture} alt="tracker picture" className="img-fluid" />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
