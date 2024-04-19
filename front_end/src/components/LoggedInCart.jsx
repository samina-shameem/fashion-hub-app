import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { CartContext } from "../context/CartProvider";
import { UserLoginContext } from "../context/UserLoginProvider";

function LoggedInCart() {
  const { loggedInCartArray, setLoggedInCartArray } = useContext(CartContext);
  const { userName, userLoggedIn } = useContext(UserLoginContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Calculate total price and total items
  useEffect(() => {
    calculateTotalPrice();
    calculateTotalItems();
  }, [loggedInCartArray]);

  function calculateTotalPrice() {
    let total = 0;
    loggedInCartArray.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }

  function calculateTotalItems() {
    let total = 0;
    loggedInCartArray.forEach((item) => {
      total += item.quantity;
    });
    setTotalItems(total);
  }

  const increaseQuantity = (index) => {
    const updatedLoggedInCartArray = [...loggedInCartArray];
    updatedLoggedInCartArray[index].quantity += 1;
    setLoggedInCartArray(updatedLoggedInCartArray);
  };

  const decreaseQuantity = (index) => {
    const updatedLoggedInCartArray = [...loggedInCartArray];
    if (updatedLoggedInCartArray[index].quantity > 0) {
      updatedLoggedInCartArray[index].quantity -= 1;
      setLoggedInCartArray(updatedLoggedInCartArray);
    }
  };

  const removeItem = (index) => {
    const updatedLoggedInCartArray = loggedInCartArray.filter((_, i) => i !== index);
    setLoggedInCartArray(updatedLoggedInCartArray);
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
      items: loggedInCartArray,
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
      items: loggedInCartArray,
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

  const payOutCart = () => {
    if (!userLoggedIn) {
      alert("Please log in to pay out");
      return;
    }

    // Fetch the cart data by the user's username
    fetch(`http://localhost:3000/carts?userName=${userName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((cartData) => {
        if (cartData.length === 0) {
          throw new Error("Cart not found");
        }
        const cartId = cartData[0].id; // Extract the cart ID
        return cartId;
      })
      .then((cartId) => {
        const paymentData = {
          userName: userName,
          items: loggedInCartArray,
        };

        // Make a POST request to initiate payment
        return fetch("http://localhost:3000/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to process payment");
          }
          console.log("Payment successful");

          // Delete the cart in the backend using the retrieved cart ID
          deleteCart(cartId);

          // Empty the loggedInCartArray
          setLoggedInCartArray([]);

          // Show a success message
          alert("Payment successful!");
        });
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        alert("Payment failed. Please try again.");
      });
  };

  return (
    <Container>
      <h1>Cart</h1>
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
          {loggedInCartArray.map((item, index) => (
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
          <ListGroup.Item>
            <Button variant="primary" style={{ marginRight: "5px" }} onClick={payOutCart}>
              Pay out
            </Button>
            {userLoggedIn ? (
              <Button variant="primary" onClick={saveCart}>
                Save
              </Button>
            ) : (
              <p>Please log in to save your cart</p>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default LoggedInCart;
