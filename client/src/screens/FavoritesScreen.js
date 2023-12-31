import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import error from "../images/8.png";
import { useGetUserID } from "../hooks/useGetUserID";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
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
  }, [savedBeers]);

  const deleteBeer = async (beerID) => {
    try {
      const response = await axios.delete(
        `/beers/deleteSavedBeer/${userID}/${beerID}`
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Beer removed from favorites");
        setSavedBeers(response.data.savedBeers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {savedBeers.length === 0 ? (
        <>
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
                    Looks like you don't have any favorite beers. GO ADD SOME!
                  </p>
                </Col>
                <Col>
                  <Image
                    src={error}
                    alt="ups"
                    style={{ width: "47rem", height: "47rem" }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </>
      ) : (
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
                        onClick={() => deleteBeer(beer._id)}
                        variant="success"
                      >
                        <FaStar
                          color={"orange"}
                          style={{
                            cursor: "pointer",
                            margin: "3",
                            fontSize: "1.3rem",
                          }}
                        />
                      </Button>
                      {beer.price} €
                    </Card.Text>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default FavoritesScreen;
