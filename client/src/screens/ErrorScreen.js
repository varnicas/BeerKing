import React from "react";
import { Button, Container, Col, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import error from "../images/13.png";

const ErrorScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#132a13",
      }}
    >
      <Container className="d-flex justify-content-center align-content-center">
        <Row className="d-flex justify-content-center align-content-center">
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <h1
              className="fw-bold "
              style={{
                color: "#ffe6a7",
              }}
            >
              Whooops!
            </h1>
            <p className="fst-italic fs-4" style={{ color: "white" }}>
              Looks like the page you are looking for doesn't exist or you don't
              have permission to access it.
              <Button size="lg" variant="danger" onClick={() => navigate(-1)}>
                {"<-"} Go back
              </Button>
            </p>
          </Col>
          <Col>
            <Image
              src={error}
              alt="404"
              style={{ width: "47rem", height: "47rem" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ErrorScreen;
