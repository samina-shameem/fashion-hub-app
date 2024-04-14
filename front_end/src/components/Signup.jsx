import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';

function Signup() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  // Validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Check if passwords match
  const arePasswordsEqual = (password1,password2) => {
    return password1 === password2;
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Check if email is valid
    if (!isValidEmail(newEmail)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError(null);
    }
  };

  const handlePassword1Change = (event) => {
    const newPassword = event.target.value;
    setPassword1(newPassword);    
    // Check if passwords are same
    if (!arePasswordsEqual(newPassword,password2)) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null);
    }    
  };

  const handlePassword2Change = (event) => {
    const newPassword = event.target.value;
    setPassword2(newPassword);
    // Check if passwords are same
    if (!arePasswordsEqual(newPassword,password1)) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null);
    }    

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Check if email is valid
    if (!isValidEmail(email)) {
      setEmailError('Email is invalid');
      return;
    } 

    // Check if passwords match
    if (!arePasswordsEqual()) {
      setPasswordError('Passwords do not match');
      return;
    }

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
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
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
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
