import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  // Validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Check if passwords match
  const arePasswordsEqual = (password1, password2) => {
    return password1 === password2;
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

  const handlePassword1Change = (event) => {
    const newPassword = event.target.value;
    setPassword1(newPassword);
    // Check if passwords are same
    if (!arePasswordsEqual(newPassword, password2)) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  };

  const handlePassword2Change = (event) => {
    const newPassword = event.target.value;
    setPassword2(newPassword);
    // Check if passwords are same
    if (!arePasswordsEqual(newPassword, password1)) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if email is valid
    if (!isValidEmail(email)) {
      setEmailError("Email is invalid");
      return;
    }

    // Check if passwords match
    if (!arePasswordsEqual(password1, password2)) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Fetch API to check if user already exists
    fetch(`http://localhost:3000/users?userName=${encodeURIComponent(email)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // If data is empty, user doesn't exist, proceed with registration
        if (data.length === 0) {
          // Proceed with registration
          return fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: email,
              password: password1,
            }),
          });
        } else {
          // User already exists, handle accordingly
          throw new Error("User already exists");
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Registration successful
        navigate("/signupMessage");
        // Redirect or handle success here
      })
      .catch((error) => {
        // Handle errors such as network errors, server errors, or user already exists
        setRegistrationError(`There was a problem with the registration: ${error.message}`);
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
            value={password1}
            onChange={handlePassword1Change}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={handlePassword2Change}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      {registrationError && <p style={{ color: "red" }}>{registrationError}</p>}
    </Container>
  );
}

export default Signup;
