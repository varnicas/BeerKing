import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer>
      <Container
        fluid
        style={{
          backgroundColor: "#7f4f24",
        }}
      >
        <Row>
          <Col md={4} className="md-4 mb-md-0">
            <h4
              className="text-uppercase p-2 text-decoration-underline"
              style={{ color: "#132a13" }}
            >
              About us
            </h4>
            <p className="m-2 fst-italic" style={{ color: "#ffe6a7" }}>
              BeerKing is an award-winning micro-brewery based in Split,
              Croatia. Founded in 2023 to bring incredible craft beer to the
              music festivals blossoming on Croatia’s shimmering Adriatic Coast,
              our beers are brewed for the experiences that bring us together.
            </p>
          </Col>
          <Col md={{ span: 4, offset: 4 }} className="mb-4 mb-md-0">
            <h4
              className="text-uppercase p-2 text-decoration-underline"
              style={{ color: "#132a13" }}
            >
              Contacts
            </h4>
            <ul className="list-unstyled mb-0 m-2">
              <li style={{ color: "#ffe6a7" }}>
                <a
                  href="#!"
                  className=" text-decoration-none fst-italic"
                  style={{ color: "#ffe6a7" }}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className=" text-decoration-none fst-italic"
                  style={{ color: "#ffe6a7" }}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-decoration-none fst-italic"
                  style={{ color: "#ffe6a7" }}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className=" text-decoration-none fst-italic"
                  style={{ color: "#ffe6a7" }}
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-decoration-none fst-italic "
                  style={{ color: "#ffe6a7" }}
                >
                  Mail: beerking@gmail.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center fw-bold">
          <p>&copy; 2023 Copyright Stipe Varnica</p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
