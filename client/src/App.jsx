import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import Tracker from "./components/Tracker/Tracker";
import Footer from "./components/Footer/Footer"; 

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import LandingPage from "./components/LandingPage/LandingPage";

import "./App.css";

const App = () => {
  return (
      <div className="App">
        <Container>
          <Row>
            <Col className="mb-5">
              <Navbar />
            </Col>
          </Row>
          <Row>
            <Col className="mb-5">
              <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/tracker" element={<Tracker />} />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
  );
};

export default App;
