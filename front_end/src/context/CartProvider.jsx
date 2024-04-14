import React, { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartArray, setCartArray] = useState([]); // Initialize as empty array
  return (
    <CartContext.Provider
      value={{
        cartArray,
        setCartArray
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
