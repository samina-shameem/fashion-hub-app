import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup"; // Added import statement for ListGroup
import { Link } from "react-router-dom";

function Product({ item }) {
  const sizesArray = item.sizes.split(",");

  return (
    <Container className="mb-4">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="https://picsum.photos/640/360" />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {sizesArray.map((size, index) => (
              <Button key={index} variant="secondary" className="me-1 mb-1">
                {size.trim()}
              </Button>
            ))}
          </ListGroup.Item>
          <ListGroup.Item>SEK: {item.price}</ListGroup.Item>
          <ListGroup.Item>
            <Link to={`/product/${item.id}`} className="btn btn-primary">
              More Details
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary"> add to cart </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Product;
