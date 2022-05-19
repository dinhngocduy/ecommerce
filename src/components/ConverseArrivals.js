import React, { useContext } from "react";
import "../css/NewArrivals.css";
import DataContext from "../context/DataContext";

import ProductsSlide from "./ProductsSlide";
function ConverseArrivals() {
  const { converseArrivals, addToCart } = useContext(DataContext);

  return (
    <div className="converseArrivals">
      <p className="newArrivals__title">Converse Arrivals</p>
      <ProductsSlide products={converseArrivals} addToCart={addToCart} />
    </div>
  );
}

export default ConverseArrivals;
