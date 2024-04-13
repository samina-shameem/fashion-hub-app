// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 

import "bootstrap/dist/css/bootstrap.min.css";

import AppHeader from "./components/AppHeader";
import Home from "./components/Home"; 
import Login from "./components/Login";
import Cart from "./components/Cart";
import Product from "./components/Product";

function App() {
  return (
    <>
      <Router>        
        <AppHeader />        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
