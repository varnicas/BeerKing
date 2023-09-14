import React from "react";
import { Container, Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const EditScreen = () => {
  const [beers, setBeers] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/beers/deleteBeer/${id}`);

      if (data.error) {
        toast.error(data.error);
      } else {
        window.location.reload();
        toast.success("Successful Delete");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        alert(error.message);
      }
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#132a13" }}>
      <Row>
        <h1
          className="text-center fw-bold m-2"
          style={{
            color: "#ffe6a7",
          }}
        >
          Edit page
        </h1>
        <p className="fw-bold fs-2 m-1" style={{ color: "#ffe6a7" }}>
          <Link to="/addBeer">
            <Button variant="primary" size="lg" className="m-2">
              Add beer+
            </Button>
          </Link>
        </p>
        <p className="fw-bold fs-2 m-1" style={{ color: "#ffe6a7" }}>
          <Link to="/manufacturers" className="text-decoration-none">
            Manufacturer edit page
          </Link>
        </p>

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
                  <Link to={`/updateBeer/${beer._id}`}>
                    <Button variant="primary" className="m-1">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() => handleDelete(beer._id)}
                  >
                    Delete
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

export default EditScreen;
