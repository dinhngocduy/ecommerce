import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import SellIcon from "@mui/icons-material/Sell";

import "../css/GeneralReport.css";
function GeneralReport({
  allUsers,
  allSoldProducts,
  products,
  soldProductsQuantity,
  setSoldProductsQuantity,
}) {
  const currentDate = new Date();

  const [newUserPastWeek, setNewUserPastWeek] = useState();
  const [soldProductsPastWeek, setSoldProductsPastWeek] = useState();

  useEffect(() => {
    const newUsers = [];
    let soldProducts = 0;
    allSoldProducts.map((soldProduct) => {
      if (
        (currentDate.setHours(23, 59, 59, 999) - soldProduct.created) /
          (1000 * 3600 * 24) <
        8
      ) {
        soldProducts = soldProducts + soldProduct.quantity;
        setSoldProductsPastWeek(soldProducts);
      }
    });
    allUsers.map((user) => {
      if (
        (currentDate.setHours(23, 59, 59, 999) - user.created) /
          (1000 * 3600 * 24) <
        8
      ) {
        newUsers.push(user);
        setNewUserPastWeek(newUsers.length);
      }
    });
  }, []);
  return (
    <div className="generalReport">
      <div className="menuReport">
        <div className="upperMenu1">
          <ProductionQuantityLimitsIcon className="generalReport__userIcon" />
          <div className="menuData">
            <p className="menuData___Number">{products.length}</p>
            <p>Total Products</p>
          </div>
        </div>
        <div className="menuAddProduct">
          <Link to="addProduct" className="menuAddProduct__Link">
            Add More Product
          </Link>
          <Link to="allProducts" className="menuAddProduct__Link">
            Manage Products
          </Link>
        </div>
      </div>
      <div className="menuReport1">
        <div className="upperMenu2">
          <PeopleAltIcon className="generalReport__userIcon" />
          <div className="menuData">
            <p className="menuData___Number">
              {newUserPastWeek > 0 ? newUserPastWeek : 0}
            </p>
            <p>Recent Registed Users Past Week</p>
          </div>
        </div>
      </div>
      <div className="menuReport1">
        <div className="upperMenu3">
          <SellIcon className="generalReport__userIcon" />
          <div className="menuData">
            <p className="menuData___Number">
              {soldProductsPastWeek > 0 ? soldProductsPastWeek : 0}
            </p>
            <p>Products Sold This Week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralReport;
