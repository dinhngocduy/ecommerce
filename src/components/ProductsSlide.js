import React from "react";
import Product from "./Product";
import { Slide } from "react-slideshow-image";
import "../css/ProductsSlide.css";
function ProductsSlide({ products, addToCart }) {
  return (
    <Slide
      className="productsSlide"
      responsive={[
        {
          breakpoint: 1200,
          settings: { slidesToShow: 4, slidesToScroll: 1 },
        },
        {
          breakpoint: 1050,
          settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        {
          breakpoint: 670,
          settings: { slidesToShow: 2, slidesToScroll: 1 },
        },
      ]}
    >
      {products.map((product) => (
        <div className="each-slide" key={product.id}>
          <div>
            <Product product={product} addToCart={addToCart} />
          </div>
        </div>
      ))}
    </Slide>
  );
}

export default ProductsSlide;
