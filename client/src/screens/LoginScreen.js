import React from "react";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
const LoginScreen = () => {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email: email,
        password: password,
      });
      sessionStorage.setItem("name", data.user.name);
      sessionStorage.setItem("isAdmin", data.user.isAdmin);

      window.localStorage.setItem("userID", data.user._id);
      window.localStorage.setItem("token", data.token);
      setUser({
        name: data.name,
        isAdmin: data.isAdmin,
        token: data.token,
        id: data._id,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        navigate("/home");
        toast.success("Login completed successfully");
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
          <Col md={8} lg={5} xs={12}>
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
                  Sign in
                </Card.Title>
                <Form onSubmit={loginUser}>
                  <Form.Group
                    className="mb-3 fw-bold"
                    controlId="formBasicEmail"
                  >
                    <Form.Label style={{ color: "#7f4f24" }}>Email</Form.Label>
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
                  >
                    <Form.Label style={{ color: "#7f4f24" }}>
                      Password
                    </Form.Label>
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
                    onSubmit={loginUser}
                  >
                    Sign in
                  </Button>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Dont have an account?{" "}
                    <Link to="/" className="text-primary fw-bold">
                      Sign up
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

export default LoginScreen;
