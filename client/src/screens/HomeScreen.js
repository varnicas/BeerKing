import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "../images/landing2.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const HomeScreen = () => {
  const [beers, setBeers] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await axios.get("/beers/getBeers");
        setBeers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBeers();
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#132a13" }}>
      <Row style={{ height: "40rem" }}>
        <Container
          fluid
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
          }}
        >
          <Col className="text-center ">
            <h1
              style={{
                color: "white",
                padding: "5px",
              }}
            >
              Welcome to <strong style={{ color: "#ffe6a7" }}>BeerKing</strong>{" "}
              {sessionStorage.getItem("name") !== null
                ? `${sessionStorage.getItem("name")}`
                : ""}
            </h1>
            <p className="fw-bold fs-5" style={{ color: "white" }}>
              BeerKing is an award-winning micro-brewery based in Split,
              Croatia. Founded in 2023 to bring incredible craft beer to the
              music festivals blossoming on Croatia’s shimmering Adriatic Coast,
              our beers are brewed for the experiences that bring us together.
              Our beers are brewed with creativity, innovation and a passion for
              experimentation.
            </p>
          </Col>
        </Container>
      </Row>
      <Row>
        <h1
          className="text-center fw-bold"
          style={{
            color: "#ffe6a7",
          }}
        >
          Products
        </h1>
        {beers
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

export default HomeScreen;
