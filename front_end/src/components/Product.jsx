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
  const { cartArray, setCartArray } = useContext(CartContext);

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

    const itemsToAdd = selectedSizes.map((size) => {
      // Check if the item with the same size is already in the cart
      const existingItemIndex = cartArray.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === size);

      // If the item already exists in the cart, increase its quantity
      if (existingItemIndex !== -1) {
        const updatedCartItem = { ...cartArray[existingItemIndex] };
        updatedCartItem.quantity += 1;
        return updatedCartItem;
      } else {
        // Otherwise, create a new item with quantity 1
        return {
          ...item,
          size,
          quantity: 1,
        };
      }
    });

    setCartArray((prevCart) => [...prevCart, ...itemsToAdd]);
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
