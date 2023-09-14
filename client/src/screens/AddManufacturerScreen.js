import React from "react";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddManufacturerScreen = () => {
  const [name, setName] = useState("");
  const [founded, setFounded] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [linkToPage, setLinkToPage] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const addManufacturer = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/manufacturers/addManufacturer", {
        name,
        founded,
        country,
        linkToPage,
        description,
        image,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Manufacturer added successfully");
        navigate("/manufacturers");
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
                  Add manufacturer
                </Card.Title>
                <Form onSubmit={addManufacturer}>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter manufacturer name"
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
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter country name"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Founded</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the year of establishment"
                      value={founded}
                      onChange={(e) => setFounded(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Link to page</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter link to manufacturer page"
                      value={linkToPage}
                      onChange={(e) => setLinkToPage(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="fw-bold fs-5"
                    onSubmit={addManufacturer}
                  >
                    Add manufacturer
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

export default AddManufacturerScreen;
