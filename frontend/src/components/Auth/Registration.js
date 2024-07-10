import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Image,
  Toast,
} from "react-bootstrap";
import logo from "../assets/ParkEasy.png";
import backgroundImage from "../assets/Background.png";
import { backendUrl } from "../API/Api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        email,
        username,
        password,
      });

      console.log("Registration successful:", response.data);
      window.localStorage.setItem("email", response.data.email);
      window.localStorage.setItem("username", response.data.username);
      // Set state for toast
      setIsRegistrationSuccess(true);
      setShowToast(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
      // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      setIsRegistrationSuccess(false);
      setShowToast(true);
    }
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <Image
              src={logo}
              style={{ width: "40px", height: "40px" }}
              fluid
            ></Image>{" "}
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
        <h2 style={{ color: "#0f6022", fontStyle: "oblique" }}>Sign Up </h2>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            type="text"
            placeholder="Enter a unique username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="I agree to Terms & Conditions of using this application."
          />
        </Form.Group>

        <Button style={{ marginTop: "10px" }} variant="success" type="submit">
          Register
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
            {isRegistrationSuccess ? "Success" : "Error"}
          </strong>
        </Toast.Header>
        <Toast.Body>
          {isRegistrationSuccess
            ? "Registration successful!"
            : "User already exits or server error!"}
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Register;
