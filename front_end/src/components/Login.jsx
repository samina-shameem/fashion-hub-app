import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { UserLoginContext } from "../context/UserLoginProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const { setUserLoggedIn, setUserName } = useContext(UserLoginContext);
  const navigate = useNavigate();

  // Validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Check if email is valid
    if (!isValidEmail(newEmail)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if email is valid
    if (!isValidEmail(email)) {
      setEmailError("Email is invalid");
      return;
    }

    // Check if password is empty
    if (!password) {
      setPasswordError("Password cannot be empty");
      return;
    }

    // Fetch API to check username and password
    fetch(`http://localhost:3000/users?userName=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // If data is empty, user doesn't exist, login error
        if (data.length === 0) {
          throw new Error("Username or password does not exist");
        } else {
          setUserLoggedIn(true);
          setUserName(email);
          navigate("/profile", { state: { msg: "User log in successful!" } });
        }
      })
      .catch((error) => {
        // Handle errors such as network errors, server errors, or user already exists
        setLoginError(`There was a problem with the login: ${error.message}`);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>

      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </Container>
  );
}

export default Login;
