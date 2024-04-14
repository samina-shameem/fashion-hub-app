import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { UserLoginContext } from "../context/UserLoginProvider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Profile({ msg }) {
  const { userLoggedIn, userName, setUserLoggedIn, setUserName } = useContext(UserLoginContext);

  const handleLogout = (event) => {
    setUserLoggedIn(false);
    setUserName("");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          {userLoggedIn ? (
            <>
              <Alert variant="success">
                <Alert.Heading>Profile:</Alert.Heading>
                <p>{msg}</p>
                <hr />
                <p>User name: {userName}</p>
              </Alert>
              <Button variant="primary" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Alert variant="success">
                <Alert.Heading>Log out success </Alert.Heading>
              </Alert>
              <Row className="justify-content-center">
                <Col md={3}>
                  <Button as={Link} to="/login" variant="primary">
                    Log in
                  </Button>
                </Col >  
                <Col md={3}>
                  <Button as={Link} to="/signup" variant="primary">
                    Sign up
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
