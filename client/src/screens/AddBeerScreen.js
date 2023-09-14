import React from "react";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useGetUserID } from "../hooks/useGetUserID";
const AddBeerScreen = () => {
  const userID = useGetUserID();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [percentage, setPercentage] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(userID);
  const navigate = useNavigate();

  const addBeer = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/beers/addBeer", {
        name,
        type,
        price,
        manufacturer,
        percentage,
        image,
        user,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Beer added successfully");
        navigate("/edit");
      }
    } catch (error) {
      console.log(error);
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
                  Add beer
                </Card.Title>
                <Form onSubmit={addBeer}>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter beer name"
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
                      placeholder="Enter image URL"
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
                      placeholder="Enter manufacturer"
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
                      placeholder="Enter alcohol percentage"
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
                      placeholder="Enter type of beer"
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
                      placeholder="Enter price of beer"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="fw-bold fs-5"
                    onSubmit={addBeer}
                  >
                    Add beer
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

export default AddBeerScreen;
