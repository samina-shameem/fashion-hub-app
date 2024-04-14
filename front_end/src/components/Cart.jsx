import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { CartContext } from "../context/CartProvider";

function Cart() {
  const { cartArray } = useContext(CartContext);

  let totalPrice = 0;
  let totalItems = 0;

  // Calculate total price and total items
  cartArray.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  return (
    <Container>
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
          </tr>
        </thead>
        <tbody>
          {cartArray.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Total Items: {totalItems}</ListGroup.Item>
          <ListGroup.Item>Total Price: {totalPrice}</ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary">Pay out</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Cart;
