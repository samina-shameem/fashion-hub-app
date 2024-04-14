import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';

 
function Signup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Check if email is valid
    if (!isValidEmail(newEmail)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send fetch request to API or perform other actions
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSecondPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </Container>
  );
}

export default Signup;
