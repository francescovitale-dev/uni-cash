// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'; // Importa il file di stili per il footer

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className='text-center'>
          <Col md={4} sm={12} >
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec dui commodo, tristique lorem eu, eleifend neque.</p>
          </Col>
          <Col md={4} sm={12}>
            <h3>Contact Us</h3>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
          </Col>
          <Col md={4} sm={12}>
            <h3>Follow Us</h3>
            <ul className="social-icons">
              <li><a href="#"><i className="bi bi-facebook"></i></a></li>
              <li><a href="#"><i className="bi bi-twitter"></i></a></li>
              <li><a href="#"><i className="bi bi-instagram"></i></a></li>
            </ul>
          </Col>
        </Row>
        <hr className="divider" />
        <p className="text-center">&copy; 2024 Eurasmus. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
