// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AppHeader from "./components/AppHeader";
import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Product from "./components/Product";
import UserLoginProvider from "./context/UserLoginProvider";
import Signup from "./components/Signup";
import SignupMessage from "./components/SignupMessage";
import Profile from "./components/Profile";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <>
      <UserLoginProvider>
        <CartProvider>
          <Router>
            <AppHeader />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signupMessage" element={<SignupMessage />} />
            </Routes>
          </Router>
        </CartProvider>
      </UserLoginProvider>
    </>
  );
}

export default App;
