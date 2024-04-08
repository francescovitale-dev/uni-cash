import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom"; // Importa Link da React Router
import "./landingPage.css";
import trackerPicture from "../../assets/img/trackerPicture.png";

const LandingPage = () => {
  return (
    <div>
      <section>
        <Container>
          <Card className="landing-page">
            <Card.Body className="text-center">
              <Row className="gx-5 align-items-center justify-content-center justify-content-lg-between">
                <Col lg={5} className="description-column">
                  <Fade triggerOnce>
                    <h2 className="display-4 lh-1 mb-3">
                      Easy Budget Tracking
                    </h2>
                  </Fade>
                  <Fade triggerOnce delay={300} className="mb-5">
                    <p className="lead fw-normal text-muted">
                      Whether it's buying alcohol, organizing a party, or
                      enjoying other fun activities, Eurasmus helps you manage your budget efficiently. Say goodbye to
                      budget worries and focus on making memories!
                      <br />
                      <span>
                      <Link to="/signup" className="btn btn-primary mt-3">
                      Get Started
                      </Link>
                      </span>
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
