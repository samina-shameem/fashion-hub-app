import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { CartContext } from "../context/CartProvider";
import { UserLoginContext } from "../context/UserLoginProvider";

function Cart() {
  const { cartArray, setCartArray } = useContext(CartContext);
  const { userName, userLoggedIn } = useContext(UserLoginContext);

  let totalPrice = 0;
  let totalItems = 0;

  // Calculate total price and total items
  cartArray.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  const increaseQuantity = (index) => {
    const updatedCartArray = [...cartArray];
    updatedCartArray[index].quantity += 1;
    setCartArray(updatedCartArray);
  };

  const decreaseQuantity = (index) => {
    const updatedCartArray = [...cartArray];
    if (updatedCartArray[index].quantity > 0) {
      updatedCartArray[index].quantity -= 1;
      setCartArray(updatedCartArray);
    }
  };

  const removeItem = (index) => {
    const updatedCartArray = cartArray.filter((_, i) => i !== index);
    setCartArray(updatedCartArray);
  };

  const saveCart = () => {
    if (!userLoggedIn) {
      alert("Please log in to save your cart");
      return;
    }

    // Fetch the existing cart for the user
    fetch(`http://localhost:3000/carts?userName=${userName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((cartData) => {
        if (cartData.length > 0) {
          // If the user has an existing cart, identify its ID
          const cartId = cartData[0].id;

          // Send a PUT request to update the existing cart
          updateCart(cartId);
        } else {
          // If the user doesn't have an existing cart, create a new one
          createCart();
        }
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  const updateCart = (cartId) => {
    // Prepare the updated cart data
    const updatedCartData = {
      userName: userName,
      cartArray: cartArray,
    };

    // Send a PUT request to update the existing cart
    fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCartData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update cart");
        }
        console.log("Cart updated successfully");

        // Clean up additional carts (if any)
        cleanupCarts(cartId);
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };

  const createCart = () => {
    // Prepare the cart data to send to the backend
    const cartData = {
      userName: userName,
      cartArray: cartArray,
    };

    // Send a POST request to create a new cart
    fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create cart");
        }
        console.log("Cart created successfully");
      })
      .catch((error) => {
        console.error("Error creating cart:", error);
      });
  };

  const cleanupCarts = (currentCartId) => {
    // Fetch all carts for the user
    fetch(`http://localhost:3000/carts?userName=${userName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((cartData) => {
        // Delete additional carts (if any)
        cartData.forEach((cart) => {
          if (cart.id !== currentCartId) {
            deleteCart(cart.id);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  const deleteCart = (cartId) => {
    // Send a DELETE request to delete the cart
    fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete cart");
        }
        console.log("Cart deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting cart:", error);
      });
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartArray.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>
                <Button variant="secondary" onClick={() => decreaseQuantity(index)}>-</Button>
                <Button variant="primary" >{item.quantity}</Button>                
                <Button variant="secondary" onClick={() => increaseQuantity(index)}>+</Button>
              </td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
              <td><Button variant="danger" onClick={() => removeItem(index)}>Remove</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Total Items: {totalItems}</ListGroup.Item>
          <ListGroup.Item>Total Price: {totalPrice}</ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary" style={{ marginRight: "5px" }}>Pay out</Button>
            {userLoggedIn ? (
              <Button variant="primary" onClick={saveCart}>Save</Button>
            ) : (
              <p>Please log in to save your cart</p>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Cart;
