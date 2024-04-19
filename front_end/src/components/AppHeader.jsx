import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import logo from "../assets/logo.jpg";
import { UserLoginContext } from "../context/UserLoginProvider";
import { CartContext } from "../context/CartProvider";

const AppHeader = () => {
  const { userLoggedIn } = useContext(UserLoginContext);
  const { anonymousCartArray } = useContext(CartContext);
  const { loggedInCartArray } = useContext(CartContext);

  return (
    <Container className="mb-4">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Fashion Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    Cart <Badge bg="secondary">{loggedInCartArray.length}</Badge>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Log in
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    Cart <Badge bg="secondary">{anonymousCartArray.length}</Badge>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default AppHeader;
