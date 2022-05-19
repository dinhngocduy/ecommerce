import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import ScrollToTop from "./ScrollToTop";
import { fs } from "./Config/Config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Orders from "./components/Orders";
import { auth } from "./Config/Config";
import { useStateValue } from "./StateProvider";
import Admin from "./components/Admin";
import ForgetPassword from "./components/ForgetPassword";
import Navbar from "./components/Navbar";
import AllProducts from "./components/AllProducts";
import FooterMedia from "./components/FooterMedia";
import SaleProducts from "./components/SaleProducts";
import Converse from "./components/Converse";
import Van from "./components/Van";
import ProductDetail from "./components/ProductDetail";
import { DataProvider } from "./context/DataContext";
import ChangePassword from "./components/ChangePassword";
import AccountDetails from "./components/AccountDetails";
import AddProduct from "./components/AddProduct";
import SearchResults from "./components/SearchResults";
function App() {
  const [{ user }, dispatch] = useStateValue();

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(async () => {
    if (user) {
      const uid = auth.currentUser.uid;
      const roles = await fs.collection("users").doc(uid).get();
      const adminRole = roles.data();
      setIsAdmin(adminRole.userRole.includes("admin"));
    }
  }, [user]);
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <DataProvider>
          <Routes>
            {isAdmin && (
              <Route
                path="/admin"
                element={[
                  <Header />,
                  <Navbar isAdmin={isAdmin} />,
                  <Admin isAdmin={isAdmin} />,
                ]}
              />
            )}
            {isAdmin && (
              <Route
                path="/admin/addProduct"
                element={[
                  <Header />,
                  <Navbar isAdmin={isAdmin} />,
                  <AddProduct isAdmin={isAdmin} />,
                ]}
              />
            )}
            <Route
              path="/checkout"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <Checkout />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/changePassword"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <ChangePassword />,
              ]}
            />
            <Route
              path="/productDetail/:id"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <ProductDetail isAdmin={isAdmin} />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/vans"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <Van />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/searchResults"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <SearchResults />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/converse"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <Converse />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/accountDetails"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <AccountDetails />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/sale"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <SaleProducts />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/allProducts"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <AllProducts isAdmin={isAdmin} />,
                <FooterMedia />,
              ]}
            />
            {isAdmin && (
              <Route
                path="/admin/allProducts"
                element={[
                  <Header />,
                  <Navbar isAdmin={isAdmin} />,
                  <AllProducts isAdmin={isAdmin} />,
                  <FooterMedia />,
                ]}
              />
            )}
            <Route path="/login" element={[<Login />]} />
            <Route path="/register" element={[<Register />]} />
            <Route path="/forgetPassword" element={[<ForgetPassword />]} />
            <Route
              path="/orders"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <Orders />,
                <FooterMedia />,
              ]}
            />
            <Route
              path="/"
              element={[
                <Header />,
                <Navbar isAdmin={isAdmin} />,
                <Home isAdmin={isAdmin} />,
                <FooterMedia />,
              ]}
            />
          </Routes>
        </DataProvider>
      </div>
    </Router>
  );
}

export default App;
