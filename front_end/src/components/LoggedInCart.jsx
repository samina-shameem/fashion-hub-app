import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"; // Import Alert component
import { CartContext } from "../context/CartProvider";
import { UserLoginContext } from "../context/UserLoginProvider";

function LoggedInCart() {
  const { loggedInCartArray, setLoggedInCartArray } = useContext(CartContext);
  const { userName, userLoggedIn } = useContext(UserLoginContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message

  // Calculate total price and total items
  useEffect(() => {
    calculateTotalPrice();
    calculateTotalItems();
  }, [loggedInCartArray]);

  // Send cart updates to the backend whenever loggedInCartArray changes
  useEffect(() => {
    if (userLoggedIn) {
      sendCartToBackend();
    }
  }, [loggedInCartArray, userLoggedIn]);

  // Calculate total price
  function calculateTotalPrice() {
    let total = 0;
    loggedInCartArray.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }

  // Calculate total items
  function calculateTotalItems() {
    let total = 0;
    loggedInCartArray.forEach((item) => {
      total += item.quantity;
    });
    setTotalItems(total);
  }

  // Increase quantity of an item
  const increaseQuantity = (index) => {
    const updatedLoggedInCartArray = [...loggedInCartArray];
    updatedLoggedInCartArray[index].quantity += 1;
    setLoggedInCartArray(updatedLoggedInCartArray);
  };

  // Decrease quantity of an item
  const decreaseQuantity = (index) => {
    const updatedLoggedInCartArray = [...loggedInCartArray];
    if (updatedLoggedInCartArray[index].quantity > 0) {
      updatedLoggedInCartArray[index].quantity -= 1;
      setLoggedInCartArray(updatedLoggedInCartArray);
    }
  };

  // Remove an item from the cart
  const removeItem = (index) => {
    const updatedLoggedInCartArray = loggedInCartArray.filter((_, i) => i !== index);
    setLoggedInCartArray(updatedLoggedInCartArray);
  };

  // Send cart data to the backend
  const sendCartToBackend = () => {
    // Prepare the cart data
    const cartData = {
      userName: userName,
      items: loggedInCartArray,
    };

    // Determine whether to create or update the cart
    if (loggedInCartArray.length === 0) {
      // If the cart is empty, delete it from the backend
      deleteCart();
    } else {
      // If the cart is not empty, send it to the backend
      fetchCartData(cartData);
    }
  };

  // Fetch existing cart data from the backend
  const fetchCartData = (cartData) => {
    fetch(`http://localhost:3000/carts?userName=${userName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((cartResponse) => {
        if (cartResponse.length > 0) {
          // If the user has an existing cart, update it
          updateCart(cartResponse[0].id, cartData);
          const cartIdsToDelete = cartResponse.slice(1).map((cart) => cart.id); // Extract cart IDs to delete
          cleanupCarts(cartIdsToDelete);
        } else {
          // If the user doesn't have an existing cart, create a new one
          createCart(cartData);
        }
      })
      .catch((error) => {
        setAlertMessage({ message: "Error fetching cart data: " + error.message, type: "danger" });
      });
  };

  // Update an existing cart
  const updateCart = (cartId, cartData) => {
    fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update cart");
        }
        setAlertMessage({ message: "Cart updated successfully", type: "success" });
      })
      .catch((error) => {
        setAlertMessage({ message: "Error updating cart: " + error.message, type: "danger" });
      });
  };

  // Create a new cart
  const createCart = (cartData) => {
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
        setAlertMessage({ message: "Cart created successfully", type: "success" });
      })
      .catch((error) => {
        setAlertMessage({ message: "Error creating cart: " + error.message, type: "danger" });
      });
  };

  // Cleanup additional carts from the backend
  const cleanupCarts = (cartIdsToDelete) => {
    cartIdsToDelete.forEach((cartId) => {
      deleteCartWithID(cartId);
    });
  };

  // Delete all carts from the backend for this user
  const deleteCart = () => {
    fetch(`http://localhost:3000/carts?userName=${userName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((cartResponse) => {
        if (cartResponse.length > 0) {
          const cartIdsToDelete = cartResponse.map((cart) => cart.id);
          cleanupCarts(cartIdsToDelete);
        }
      })
      .catch((error) => {
        setAlertMessage({ message: "Error fetching cart data: " + error.message, type: "danger" });
      });
  };

  // Delete the cart from the backend using cartId
  const deleteCartWithID = (cartId) => {
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
        setAlertMessage({ message: "Error deleting cart: " + error.message, type: "danger" });
      });
  };

  // Pay out the cart
  const payOutCart = () => {
    if (!userLoggedIn) {
      setAlertMessage({ message: "Please log in to pay out", type: "danger" }); // Set alert message
      return;
    }

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
        const cartId = cartData[0].id;
        const paymentData = {
          userName: userName,
          items: loggedInCartArray,
        };

        fetch("http://localhost:3000/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to process payment");
            }
            console.log("Payment successful");
            //deleteCart(cartId);
            setLoggedInCartArray([]);
            setAlertMessage({ message: "Payment successful!", type: "success" });
          })
          .catch((error) => {
            setAlertMessage({ message: "Error processing payment: " + error.message, type: "danger" });
          });
      })
      .catch((error) => {
        setAlertMessage({ message: "Error processing payment: " + error.message, type: "danger" });
      });
  };
  // Check if the cart is empty
  const isCartEmpty = loggedInCartArray.length === 0;

  return (
    <Container>
      {alertMessage && (
        <Alert variant={alertMessage.type} className="mt-3">
          {alertMessage.message}
        </Alert>
      )}
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
      {!isCartEmpty &&
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Total Items: {totalItems}</ListGroup.Item>
          <ListGroup.Item>Total Price: {totalPrice}</ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary" style={{ marginRight: "5px" }} onClick={payOutCart}>
              Pay out
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card> }
    </Container>
  );
}

export default LoggedInCart;
