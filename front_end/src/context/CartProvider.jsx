import React, { Children } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartArray, setCartArray] = useState(false);  
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
