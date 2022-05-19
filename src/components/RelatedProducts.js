import React, { useState, useEffect } from "react";
import { fs } from "../Config/Config";

import "../css/RelatedProducts.css";
import ProductsSlide from "./ProductsSlide";
function RelatedProducts({ product, addToCart }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const getRelatedProducts = async () => {
    const products = await fs
      .collection("Products")
      .where("type", "==", product.type)
      .get();
    const productsArray = [];
    for (let snap of products.docs) {
      let data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setRelatedProducts(productsArray);
      }
    }
  };
  useEffect(() => {
    getRelatedProducts();
  }, []);

  return (
    <div className="relatedProducts">
      <h1 className="relatedProducts__title">Related Products</h1>
      <ProductsSlide products={relatedProducts} addToCart={addToCart} />
    </div>
  );
}

export default RelatedProducts;
