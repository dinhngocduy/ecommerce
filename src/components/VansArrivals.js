import React, { useContext } from "react";
import DataContext from "../context/DataContext";

import "../css/NewArrivals.css";
import ProductsSlide from "./ProductsSlide";
function VansArrivals() {
  const { vansArrivals, addToCart } = useContext(DataContext);

  return (
    <div className="vansArrivals">
      <p className="newArrivals__title">Vans Arrivals</p>
      <ProductsSlide products={vansArrivals} addToCart={addToCart} />
    </div>
  );
}

export default VansArrivals;
