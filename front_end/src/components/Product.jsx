import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

function Product({ item }) {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSize = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((selectedSize) => selectedSize !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  };

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
            {item.sizes.split(",").map((size) => (
              <Button
                key={size}
                variant={selectedSizes.includes(size) ? "primary" : "secondary"}
                onClick={() => toggleSize(size)}
                style={{ marginRight: "5px" }}
              >
                {size}
              </Button>
            ))}
          </ListGroup.Item>
          <ListGroup.Item>SEK: {item.price}</ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary">More Details</Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary">Add to Cart</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Product;
