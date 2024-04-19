import React, { useContext } from "react";
import LoggedInCart from "./LoggedInCart";
import AnonymousCart from "./AnonymousCart";
import { UserLoginContext } from "../context/UserLoginProvider";
import Alert from "react-bootstrap/Alert";

function Cart() {
  const { userLoggedIn } = useContext(UserLoginContext);

  return (
    <div>
      {userLoggedIn ? (
        <LoggedInCart />
      ) : (
        <Alert variant="warning">
          <p>User not logged in, please log in to save the cart and pay out</p>
        </Alert>
      )}
      <AnonymousCart />
    </div>
  );
}

export default Cart;
