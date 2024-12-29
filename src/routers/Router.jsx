import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected imports
import Navbar from "../pages/Navbar";
import Home from "../components/Home";
import ProductList from "../components/ProductList";
import ProductPost from "../components/ProductPost";
import OrderProduct from "../components/OrderProduct";
import UserList from "../components/UserList";
import Page404 from "../components/Page404";
import EditProduct from "../components/ProductEdit";
import UserUpdate from "../components/userUpdate";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-post" element={<ProductPost />} />
        <Route path="/order" element={<OrderProduct />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/Product-edit/:id" element={<EditProduct />} />
        <Route path="/UserUpdate/:id" element={<UserUpdate />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter; // Export the renamed component
