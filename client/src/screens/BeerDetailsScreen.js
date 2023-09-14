import React from "react";
import { Row, Col, Container, Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const BeerDetailsScreen = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState({});

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await axios.get(`/beers/getBeerById/${id}`);
        setBeer(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBeer();
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#132a13",
      }}
    >
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={4} xs={12}>
            <Card
              className="shadow"
              border="dark"
              style={{ backgroundColor: "rgb(111, 77, 48)" }}
            >
              <Card.Img variant="top" src={`${beer.image}`} />
              <Card.Body>
                <Card.Title
                  className="text-center fs-1"
                  style={{ color: "#ffe6a7" }}
                >
                  {beer.name}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item
                  className="  p-1"
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: "0px",
                    color: "white",
                    fontSize: "1.3rem",
                  }}
                >{`Manufacturer: ${beer.manufacturer}`}</ListGroup.Item>
                <ListGroup.Item
                  className="  p-1"
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: "0px",
                    color: "white",
                    fontSize: "1.3rem",
                  }}
                >
                  {`Alc. percentage: ${beer.percentage}`}
                </ListGroup.Item>
                <ListGroup.Item
                  className="  p-1"
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: "0px",
                    color: "white",
                    fontSize: "1.3rem",
                  }}
                >
                  {`Type: ${beer.type}`}{" "}
                </ListGroup.Item>
              </ListGroup>
              <Card.Text
                as="h3"
                style={{
                  padding: "3px",
                  display: "flex",
                  justifyContent: "end",
                  color: "#ffe6a7",
                  fontSize: "2.2rem",
                }}
              >
                {beer.price} €
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BeerDetailsScreen;
