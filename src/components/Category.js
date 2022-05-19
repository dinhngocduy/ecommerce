import React from "react";
import "../css/Category.css";
import van from "../images/van.webp";
import converse from "../images/converse.webp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CachedIcon from "@mui/icons-material/Cached";
import SupportIcon from "@mui/icons-material/Support";
function Category() {
  return (
    <div className="category">
      <div className="category__shoeTypes">
        <img src={van} alt="" className="category__van" />
        <img src={converse} alt="" className="category__converse" />
      </div>
      <div className="category__support">
        <div className="category__supportOption">
          <LocalShippingIcon />
          <p>FREE SHIPPING</p>
        </div>
        <div className="category__supportOption">
          <CreditCardIcon />
          <p>GUARANTEED PAYMENT</p>
        </div>
        <div className="category__supportOption">
          <CachedIcon />
          <p>FREE RETURN</p>
        </div>
        <div className="category__supportOption">
          <SupportIcon />
          <p>24/7 SUPPORT</p>
        </div>
      </div>
    </div>
  );
}

export default Category;
