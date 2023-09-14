import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/register", {
        name: name,
        email: email,
        password: password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        navigate("/login");
        toast.success("Registration completed");
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
          <Col md={7} lg={4} xs={10}>
            <Card className="shadow" bg="light" border="dark">
              <Card.Img
                variant="top"
                src="https://www.tastingtable.com/img/gallery/40-most-popular-beers-ranked-worst-to-best/intro-1658943990.jpg"
              />
              <Card.Body>
                <Card.Title
                  className="text-center fs-1"
                  style={{ color: "#7f4f24" }}
                >
                  Sign up
                </Card.Title>
                <Form onSubmit={registerUser}>
                  <Form.Group
                    className="mb-3 fw-bold"
                    controlId="formBasicName"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      pattern=".+@gmail\.com"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 fw-bold"
                    controlId="formBasicEmail"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 fw-bold"
                    controlId="formBasicPassword"
                    style={{ color: "#7f4f24" }}
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="fw-bold fs-5"
                    onClick={(event) => registerUser(event)}
                  >
                    Sign up
                  </Button>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Already have an account?{" "}
                    <Link to="login" className="text-primary fw-bold">
                      Log In
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterScreen;
