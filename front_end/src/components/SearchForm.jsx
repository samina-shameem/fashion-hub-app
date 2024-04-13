import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function SearchForm() {
  return (
    <Container className="mb-4">
      <Row className="justify-content-md-center">
        <Form className="d-flex">
          <Col >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Col>
          <Col >
            <Button variant="outline-success">Search</Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}

export default SearchForm;
