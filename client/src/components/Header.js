import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <header>
      <Navbar
        expand="md"
        className="bg-body-tertiary d-flex flex-direction-row"
        style={{ padding: 0 }}
      >
        <Container
          fluid
          style={{
            backgroundColor: "#7f4f24",
          }}
        >
          <Navbar.Brand
            href="/home"
            className="fw-bold fs-2"
            style={{ marginLeft: "10px", color: "#ffe6a7" }}
          >
            BeerKing
            <img
              src={require("../images/logo.png")}
              height="70"
              width="70"
              alt=""
              loading="lazy"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className=" ms-auto my-2 my-lg-0 fw-bold fs-5 d-flex flex-direction-row"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/home" style={{ color: "#ffe6a7" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/manufacturers" style={{ color: "#ffe6a7" }}>
                Manufacturers
              </Nav.Link>
              <Nav.Link href="/info" style={{ color: "#ffe6a7" }}>
                Info
              </Nav.Link>
              <Nav.Link href="/favorites" style={{ color: "#ffe6a7" }}>
                Favorites
              </Nav.Link>
              {sessionStorage.getItem("name") === null ? (
                <Link to="/login">
                  <Button variant="success">Login</Button>
                </Link>
              ) : sessionStorage.getItem("isAdmin") === "false" ? (
                <Navbar.Brand style={{ color: "#ffe6a7" }}>
                  <Button variant="success" className="m-1" onClick={logout}>
                    Logout
                  </Button>
                </Navbar.Brand>
              ) : (
                <>
                  <Nav.Link href="/edit" style={{ color: "#ffe6a7" }}>
                    Edit
                  </Nav.Link>

                  <Button variant="success" className="p-2" onClick={logout}>
                    Logout{" "}
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
