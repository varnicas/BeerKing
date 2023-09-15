import React from "react";
import { Container, Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "../images/landing2.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
const HomeScreen = () => {
  const [beers, setBeers] = useState([]);
  const [savedBeers, setSavedBeers] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await axios.get("/beers/getBeers");
        setBeers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedBeers = async () => {
      try {
        const response = await axios.get(`/beers/savedBeers/${userID}`);
        setSavedBeers(response.data.savedBeers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBeers();
    fetchSavedBeers();
  }, []);

  const isBeerSaved = (id) => savedBeers.includes(id);

  const saveBeer = async (beerID) => {
    try {
      const response = await axios.put("beers/saveBeer", { beerID, userID });
      setSavedBeers(response.data.savedBeers);
      toast.success("Beer added to favorites");
    } catch (error) {
      console.log(error);
    }
  };

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
          className="text-center fw-bold m-2"
          style={{
            color: "#ffe6a7",
          }}
        >
          Products
        </h1>
        {beers
          .sort((a, b) => (a.name > b.name ? 1 : -1))
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
                    justifyContent: "space-between",
                    color: "#ffe6a7",
                  }}
                >
                  <Button
                    disabled={isBeerSaved(beer._id)}
                    onClick={() => saveBeer(beer._id)}
                    variant="success"
                  >
                    <FaStar
                      color={isBeerSaved(beer._id) ? "orange" : "lightgray"}
                      style={
                        isBeerSaved(beer._id)
                          ? {
                              margin: "3",
                              fontSize: "1.3rem",
                            }
                          : {
                              cursor: "pointer",
                              margin: "3",
                              fontSize: "1.3rem",
                            }
                      }
                    />
                  </Button>
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
