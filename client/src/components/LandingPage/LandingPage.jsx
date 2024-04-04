import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import "./landingPage.css";
import trackerPicture from "../../assets/img/trackerPicture.png";

const LandingPage = () => {
  return (
    <div>
      <section>
        {/* <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={8}>
              <Fade triggerOnce delay={500}>
                <Card className="text-center p-4">
                  <h2 className="display-5 mb-4">
                    Manage Your Finances with Ease
                  </h2>
                  <p className="lead text-muted">
                   Eurasmus Money Tracker: where tracking every penny spent on booze and parties becomes a breeze! 💸🍻 With us, not only will you keep your finances in check while having fun, but you'll also see exactly how much you're investing in your party nights! Whether you're splurging on tequila shots or club entries, we'll show you where your money goes! Join us and get ready to uncover the secrets of your party animal budget with Eurasmus Money Tracker! 🎉🥳
                  </p>
                  <Button variant="primary" className="mt-3">
                    Get Started
                  </Button>
                </Card>
              </Fade>
            </Col>
          </Row>
        </Container> */}
        <Container>
          <Card className="landing-page">
            <Card.Body className="text-center">
              <Row className="gx-5 align-items-center justify-content-center justify-content-lg-between">
                <Col lg={5} className="description-column">
                  <Fade triggerOnce>
                    <h2 className="display-4 lh-1 mb-4">
                      Easy Budget Tracking
                    </h2>
                  </Fade>
                  <Fade triggerOnce delay={300}>
                    <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                      Whether it's buying alcohol, organizing a party, or
                      enjoying other fun activities, Eurasmus Party Tracker
                      helps you manage your budget efficiently. Say goodbye to
                      budget worries and focus on making memories!
                    </p>
                  </Fade>
                </Col>
                <Col sm={8} md={6}>
                  <div className="px-5 px-sm-0">
                    <motion.img
                      src={trackerPicture}
                      alt="tracker picture"
                      className="img-fluid tracker-picture"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    />
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
