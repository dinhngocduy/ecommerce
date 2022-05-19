import React from "react";
import "../css/Products.css";
import Product from "./Product";

function Products({ products, addToCart, isAdmin }) {
  return (
    <div className="products">
      <div className="products__products">
        {products.map((product) => (
          <Product product={product} addToCart={addToCart} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}

export default Products;
