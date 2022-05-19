import React, { useContext } from "react";
import Products from "./Products";
import DataContext from "../context/DataContext";
import Pagination from "./Pagination";
import productBanner from "../images/saleBanner.bmp";
import "../css/AllProducts.css";
function SaleProducts() {
  const {
    saleProducts,
    GetUserUid,
    addToCart,
    productsPerPage,
    paginate,
    indexOfFirstProduct,
    indexOfLastProduct,
  } = useContext(DataContext);
  const currentProducts = saleProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="allProducts">
      <img className="productBanner" src={productBanner} alt="" />
      <h1>Sale Products</h1>
      <Products
        products={currentProducts}
        GetUserUid={GetUserUid}
        addToCart={addToCart}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={saleProducts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default SaleProducts;
