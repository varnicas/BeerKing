import React from "react";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
const UpdateBeerScreen = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [percentage, setPercentage] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await axios.get(`/beers/getBeerById/${id}`);
        setName(response.data.name);
        setType(response.data.type);
        setPrice(response.data.price);
        setManufacturer(response.data.manufacturer);
        setPercentage(response.data.percentage);
        setImage(response.data.image);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBeer();
  }, []);

  const updateBeer = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/beers/updateBeer/${id}`, {
        name,
        price,
        type,
        percentage,
        image,
        manufacturer,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        navigate("/edit");
        toast.success("Beer updated successfully");
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
    <div
      style={{
        backgroundColor: "#132a13",
      }}
    >
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={7} lg={5} xs={10}>
            <Card className="shadow" bg="light" border="dark">
              <Card.Body>
                <Card.Title
                  className="text-center fs-1"
                  style={{ color: "#7f4f24" }}
                >
                  Update beer
                </Card.Title>
                <Form onSubmit={updateBeer}>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update beer name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Manufacturer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update manufacturer"
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Alc.percentage</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update alcohol percentage"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update type of beer"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update price of beer"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="fw-bold fs-5"
                    onSubmit={updateBeer}
                  >
                    Update beer
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateBeerScreen;
