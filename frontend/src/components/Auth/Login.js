import React, { useState } from "react";
import {
  Form,
  Button,
  Image,
  Nav,
  Navbar,
  Container,
  Spinner,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/ParkEasy.png";
import { backendUrl } from "../API/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      setLoading(true);

      const response = await axios.post(`${backendUrl}/auth/login`, {
        email: email,
        password: password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("username", response.data.username);

      setIsLoginSuccess(true);
      setShowToast(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);

      setIsLoginSuccess(false);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <Image src={logo} style={{ width: "40px", height: "40px" }} fluid />{" "}
            ParkEasy
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link onClick={() => navigate("/support")}>Support</Nav.Link>
            <Nav.Link onClick={() => navigate("/faq")}>FAQ</Nav.Link>
            <Nav.Link onClick={() => navigate("/register")}>Sign Up</Nav.Link>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Form
        style={{ marginTop: "20px", marginLeft: "20px" }}
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h2 style={{ color: "#0f6022", fontStyle: "oblique" }}>Login </h2>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: "#348e49" }}>Email address</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          style={{ marginTop: "10px" }}
          variant="success"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Login"
          )}
        </Button>
      </Form>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">
            {isLoginSuccess ? "Success" : "Error"}
          </strong>
        </Toast.Header>
        <Toast.Body>
          {isLoginSuccess
            ? "Login successful!"
            : "Login failed. Please check your credentials."}
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Login;
