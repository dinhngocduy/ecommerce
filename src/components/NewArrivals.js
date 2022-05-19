import React from "react";
import VansArrivals from "./VansArrivals";
import "../css/NewArrivals.css";
import ConverseArrivals from "./ConverseArrivals";

function NewArrivals({ products, addToCart }) {
  return (
    <div className="newArrivals">
      <ConverseArrivals products={products} addToCart={addToCart} />
      <VansArrivals products={products} addToCart={addToCart} />
    </div>
  );
}

export default NewArrivals;
