import React from "react";
import { Container, Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
const FavoritesScreen = () => {
  const [savedBeers, setSavedBeers] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedBeers = async () => {
      try {
        const response = await axios.get(`/beers/getSavedBeers/${userID}`);
        setSavedBeers(response.data.savedBeers);
        console.log(response.data.savedBeers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSavedBeers();
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#132a13" }}>
      <Row>
        <h1
          className="text-center fw-bold m-2"
          style={{
            color: "#ffe6a7",
          }}
        >
          Favorites
        </h1>

        {savedBeers
          .sort((a, b) => (a.manufacturer > b.manufacturer ? 1 : -1))
          .map((beer) => (
            <Col sm={12} md={6} lg={2} key={beer.name}>
              <Card
                className="my-3 p-2 rounded"
                style={{ backgroundColor: "rgb(111 77 48)" }}
              >
                <Link to={`/beerDetails/${beer._id}`}>
                  <Card.Img src={beer.image} variant="top" />
                </Link>
                <Card.Body>
                  <Link
                    to={`/beerDetails/${beer._id}`}
                    className="text-decoration-none"
                  >
                    <Card.Title
                      as="h3"
                      style={{ color: "#ffe6a7", margin: "-2px" }}
                    >
                      <strong>{beer.name}</strong>
                    </Card.Title>
                  </Link>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item
                    className=" fst-italic p-1"
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: "0px",
                      color: "white",
                    }}
                  >{`Manufacturer: ${beer.manufacturer}`}</ListGroup.Item>
                  <ListGroup.Item
                    className=" fst-italic p-1"
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: "0px",
                      color: "white",
                    }}
                  >
                    {`Alc. percentage: ${beer.percentage}`}
                  </ListGroup.Item>
                  <ListGroup.Item
                    className=" fst-italic p-1"
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: "0px",
                      color: "white",
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
                  }}
                >
                  {beer.price} €
                </Card.Text>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default FavoritesScreen;
