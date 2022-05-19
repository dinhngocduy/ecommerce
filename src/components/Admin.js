import React, { useState, useEffect, useContext } from "react";
import { fs } from "../Config/Config";
import { auth } from "../Config/Config";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import NewUsersChart from "./NewUsersChart";
import SoldProductsPerDay from "./SoldProductsPerDay";
import GeneralReport from "./GeneralReport";
import "../css/Admin.css";
function Admin() {
  const { allUsers } = useContext(DataContext);
  const { allSoldProducts, soldProductsQuantity, setSoldProductsQuantity } =
    useContext(DataContext);
  const { products } = useContext(DataContext);

  return (
    <div className="admin">
      <h1 className="admin__title">Admin Panel</h1>
      <hr></hr>
      <GeneralReport
        allUsers={allUsers}
        soldProductsQuantity={soldProductsQuantity}
        setSoldProductsQuantity={setSoldProductsQuantity}
        allSoldProducts={allSoldProducts}
        products={products}
      />
      <NewUsersChart allUsers={allUsers} />
      <SoldProductsPerDay />
    </div>
  );
}

export default Admin;
