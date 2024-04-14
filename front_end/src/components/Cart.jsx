import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { CartContext } from "../context/CartProvider";

function Cart() {
  const { cartArray } = useContext(CartContext);

  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartArray.map((item, index) => (
            item.sizes.map((size, i) => (
              <tr key={index + '-' + i}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{size}</td>
                <td>{item.price}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Cart;
