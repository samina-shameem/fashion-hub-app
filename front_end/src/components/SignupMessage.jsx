import React from "react";
import { Link } from "react-router-dom"; 
import Button from "react-bootstrap/Button"; 

import Alert from "react-bootstrap/Alert";

function SignupMessage() {
  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>Registration successful</Alert.Heading>
      </Alert>
      <p>
        <Button as={Link} to="/login" variant="primary">
          Login here
        </Button>
      </p>
    </div>
  );
}

export default SignupMessage;
