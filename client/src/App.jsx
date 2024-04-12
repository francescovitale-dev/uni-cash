import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    setAuthenticated(!!isAuthenticated);
  }, []);

  return (
      <div className="App">
        <Container>
          <Row>
            <Col className="mb-5">
              <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </Col>
          </Row>
          <Row>
            <Col className="mb-5">
              <Routes>
                <Route exact path="/" element={authenticated ? <Navigate to="/tracker" /> : <LandingPage />} />
                <Route path="/login" element={authenticated ? <Navigate to="/tracker" /> : <Login />} />
                <Route path="/signup" element={authenticated ? <Navigate to="/tracker" /> : <Signup />} />
                <Route path="/tracker" element={authenticated ? <Tracker /> : <Navigate to="/login" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
  );
};

export default App;
