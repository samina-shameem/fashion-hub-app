import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert"; // Import Alert component
import { CartContext } from "../context/CartProvider";

function Product({ item }) {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message
  const { setCartArray } = useContext(CartContext);

  const toggleSize = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((selectedSize) => selectedSize !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  };

  const addToCart = () => {
    // Check if any size is selected
    if (selectedSizes.length === 0) {
      setAlertMessage("Please select a size before adding to cart");
      return;
    }

    // Add the item to the cart with selected sizes
    setCartArray((prevCart) => [...prevCart, { ...item, sizes: selectedSizes }]);
    setAlertMessage("Item added to cart successfully!");
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
            <Button variant="primary" onClick={addToCart}>
              Add to Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      {/* Render Alert if alertMessage exists */}
      {alertMessage && (
        <Alert variant="danger" className="mt-3">
          {alertMessage}
        </Alert>
      )}
    </Container>
  );
}

export default Product;
