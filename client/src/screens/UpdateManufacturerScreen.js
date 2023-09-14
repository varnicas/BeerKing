import React from "react";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
const UpdateManufacturerScreen = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [founded, setFounded] = useState("");
  const [linkToPage, setLinkToPage] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const response = await axios.get(
          `/manufacturers/getManufacturerById/${id}`
        );
        setName(response.data.name);
        setCountry(response.data.country);
        setFounded(response.data.founded);
        setLinkToPage(response.data.linkToPage);
        setDescription(response.data.description);
        setImage(response.data.image);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchManufacturer();
  }, []);

  const updateManufacturer = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/manufacturers/updateManufacturer/${id}`,
        {
          name,
          founded,
          country,
          description,
          image,
          linkToPage,
        }
      );

      if (data.error) {
        toast.error(data.error);
      } else {
        navigate("/manufacturers");
        toast.success("Manufacturer updated successfully");
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
                  Update manufacturer
                </Card.Title>
                <Form onSubmit={updateManufacturer}>
                  <Form.Group
                    className="mb-2 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update manufacturer name"
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
                    <Form.Label>Founded</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Update year of establishment"
                      value={founded}
                      onChange={(e) => setFounded(e.target.value)}
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
                      placeholder="Update manufacturer country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
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
                      placeholder="Update description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                      placeholder="Update link to manufacturers page"
                      value={linkToPage}
                      onChange={(e) => setLinkToPage(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="fw-bold fs-5"
                    onSubmit={updateManufacturer}
                  >
                    Update manufacturer
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

export default UpdateManufacturerScreen;
