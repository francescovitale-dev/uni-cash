import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <Container className="text-center">
        <div>
          <h1 className="display-1 text-primary">Oops!</h1>
          <h2 className="h4 text-primary">Lost?</h2>
          <p className="lead">
            Looks like you've stumbled into the wrong alleyway of the Erasmus party district.
          </p>
          <p className="lead">
            Are you sure you're not a bit tipsy to end up here?
          </p>
          <p className="lead">
            Don't worry, we're mapping out the party streets of Erasmus to guide you back to <Link to="/" className="text-primary fw-bold">safety</Link> or to discover more vibrant corners of your Erasmus party journey.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
