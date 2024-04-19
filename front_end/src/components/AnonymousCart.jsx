import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { CartContext } from "../context/CartProvider";
import { UserLoginContext } from "../context/UserLoginProvider";

function AnonymousCart() {
  const { anonymousCartArray, setAnonymousCartArray } = useContext(CartContext);
  const { loggedInCartArray, setLoggedInCartArray } = useContext(CartContext);
  const { userLoggedIn } = useContext(UserLoginContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
    calculateTotalItems();
  }, [anonymousCartArray]);

  function calculateTotalPrice() {
    let total = 0;
    anonymousCartArray.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }

  function calculateTotalItems() {
    let total = 0;
    anonymousCartArray.forEach((item) => {
      total += item.quantity;
    });
    setTotalItems(total);
  }

  const increaseQuantity = (index) => {
    const updatedAnonymousCartArray = [...anonymousCartArray];
    updatedAnonymousCartArray[index].quantity += 1;
    setAnonymousCartArray(updatedAnonymousCartArray);
    calculateTotalPrice();
    calculateTotalItems();
  };

  const decreaseQuantity = (index) => {
    const updatedAnonymousCartArray = [...anonymousCartArray];
    if (updatedAnonymousCartArray[index].quantity > 0) {
      updatedAnonymousCartArray[index].quantity -= 1;
      setAnonymousCartArray(updatedAnonymousCartArray);
      calculateTotalPrice();
      calculateTotalItems();
    }
  };

  const removeItem = (index) => {
    const updatedAnonymousCartArray = anonymousCartArray.filter((_, i) => i !== index);
    setAnonymousCartArray(updatedAnonymousCartArray);
    calculateTotalPrice();
    calculateTotalItems();
  };

  const addToUserCart = (index) => {
    // Move the item to the user's cart and remove it from the anonymous cart
    const itemToAdd = anonymousCartArray[index];
    setLoggedInCartArray([...loggedInCartArray, itemToAdd]);
    const updatedAnonymousCartArray = anonymousCartArray.filter((_, i) => i !== index);
    setAnonymousCartArray(updatedAnonymousCartArray);
    calculateTotalPrice();
    calculateTotalItems();
  };

  // Check if the cart is empty
  const isCartEmpty = anonymousCartArray.length === 0;

  // Render content conditionally
  return (
    <Container>
      {!isCartEmpty && (
        <>
          <h1>Cart without login</h1>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Product ID</th>
                <th>Name</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {anonymousCartArray.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>
                    <Button variant="secondary" onClick={() => decreaseQuantity(index)}>
                      -
                    </Button>
                    <Button variant="primary">{item.quantity}</Button>
                    <Button variant="secondary" onClick={() => increaseQuantity(index)}>
                      +
                    </Button>
                    {userLoggedIn && (
                      <Button variant="secondary" onClick={() => addToUserCart(index)}>
                        Add to user cart
                      </Button>
                    )}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeItem(index)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Total Items: {totalItems}</ListGroup.Item>
              <ListGroup.Item>Total Price: {totalPrice}</ListGroup.Item>
            </ListGroup>
          </Card>
        </>
      )}
    </Container>
  );
}

export default AnonymousCart;
