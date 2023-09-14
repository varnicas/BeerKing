import React from "react";
import { Row, Col, Container, Card, ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const EditManufacturersScreen = () => {
  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await axios.get("/manufacturers/getManufacturers");
        setManufacturers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchManufacturers();
  }, []);
  return (
    <Container fluid style={{ backgroundColor: "#132a13" }}>
      <Row className="text-center">
        <h1
          style={{
            padding: "5px",
          }}
        >
          <strong style={{ color: "#ffe6a7" }}>Manufacturers</strong>{" "}
        </h1>
        <p className="fw-bold fs-2 m-1" style={{ color: "#ffe6a7" }}>
          <Link to="/addManufacturer">
            <Button variant="primary" size="lg" className="m-2">
              Add manufacturer+
            </Button>
          </Link>
        </p>
        <Col className="text-center d-flex flex-row flex-wrap">
          {manufacturers.map((manufacturer) => (
            <Col sm={12} md={6} lg={2} key={manufacturer.name} className="p-2">
              <Card
                className="my-3 p-2 rounded"
                style={{ backgroundColor: "rgb(111 77 48)" }}
              >
                <Card.Img src={manufacturer.image} variant="top" />

                <Card.Body>
                  <Card.Title
                    as="h3"
                    style={{ color: "#ffe6a7", margin: "-2px" }}
                  >
                    <strong>{manufacturer.name}</strong>
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item
                    className="fw-bold fst-italic"
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: "0px",
                      color: "white",
                    }}
                  >{`Country: ${manufacturer.country}`}</ListGroup.Item>
                  <ListGroup.Item
                    className="fw-bold fst-italic"
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: "0px",
                      color: "white",
                    }}
                  >
                    {`Founded: ${manufacturer.founded}`}
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="fw-bold fst-italic"
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: "0px",
                    }}
                  >
                    <a
                      href={`${manufacturer.linkToPage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#ffe6a7" }}
                    >
                      {`${manufacturer.name} site `}{" "}
                    </a>
                  </ListGroup.Item>
                </ListGroup>
                <Card.Text
                  as="p"
                  style={{
                    padding: "3px",

                    color: "white",
                  }}
                >
                  {manufacturer.description}
                </Card.Text>
                <Card.Body className="m-0 p-0">
                  <Link to="/editManufacturer">
                    <Button variant="primary" className="m-1">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="danger" className="m-1">
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default EditManufacturersScreen;
