import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { CartContext } from "../context/CartProvider";
import ProductImage from "./ProductImage";

function Product({ item }) {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
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
    if (selectedSizes.length === 0) {
      setAlertMessage({ message: "Please select a size before adding to cart", type: "danger" });
      return;
    }

    const itemsToAdd = selectedSizes.map((size) => {
      const existingItemIndex = cartArray.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === size);

      if (existingItemIndex !== -1) {
        const updatedCartItem = { ...cartArray[existingItemIndex] };
        updatedCartItem.quantity += 1;
        return updatedCartItem;
      } else {
        return {
          ...item,
          size,
          quantity: 1,
        };
      }
    });

    setCartArray((prevCart) => [...prevCart, ...itemsToAdd]);
    setAlertMessage({ message: "Item added to cart successfully!", type: "success" });
  };

  return (
    <Container className="mb-4">
      <Card style={{ width: "18rem" }}>
        <ProductImage />
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
      {alertMessage && (
        <Alert variant={alertMessage.type} className="mt-3">
          {alertMessage.message}
        </Alert>
      )}
    </Container>
  );
}

export default Product;
