import React, { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [loggedInCartArray, setLoggedInCartArray] = useState([]); // Initialize as empty array for logged in user
  const [anonymousCartArray, setAnonymousCartArray] = useState([]); // Initialize as empty array for anonymous user
  
  return (
    <CartContext.Provider
      value={{
        loggedInCartArray,
        setLoggedInCartArray,
        anonymousCartArray,
        setAnonymousCartArray
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
