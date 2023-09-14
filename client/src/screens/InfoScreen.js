import React from "react";
import { useState, useEffect } from "react";
import { Container, ListGroup, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
const InfoScreen = () => {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/manufacturers/countArticles");
        setArticles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#132a13",
      }}
    >
      <Container>
        <Row
          className="vh-100 d-flex justify-content-center  "
          style={{ flexDirection: "row" }}
        >
          <Col md={8} lg={3} xs={12}>
            <h1
              className="text-center fw-bold"
              style={{
                color: "#ffe6a7",
              }}
            >
              Users
            </h1>
            <Table
              striped
              bordered
              hover
              style={{
                backgroundColor: "rgb(111, 77, 48)",
              }}
              className="fw-bold fs-5"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#7f4f24",
                    }}
                  >
                    User
                  </th>
                  <th
                    style={{
                      backgroundColor: "#7f4f24",
                    }}
                  >
                    Admin
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td
                      style={{
                        backgroundColor: "#ffe6a7",
                      }}
                    >
                      {user.name}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#ffe6a7",
                      }}
                    >
                      {user.isAdmin ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={8} lg={3} xs={12}>
            <h1
              className="text-center fw-bold"
              style={{
                color: "#ffe6a7",
              }}
            >
              Articles
            </h1>
            <Table
              striped
              bordered
              hover
              style={{
                backgroundColor: "rgb(111, 77, 48)",
              }}
              className="fw-bold fs-5"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#7f4f24",
                    }}
                  >
                    Manufacturer
                  </th>
                  <th
                    style={{
                      backgroundColor: "#7f4f24",
                    }}
                  >
                    Articles
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles
                  .sort((a, b) => (a.number < b.number ? 1 : -1))
                  .map((article) => (
                    <tr>
                      <td
                        style={{
                          backgroundColor: "#ffe6a7",
                        }}
                      >
                        {article.name}
                      </td>
                      <td
                        style={{
                          backgroundColor: "#ffe6a7",
                        }}
                      >
                        {article.number}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InfoScreen;
