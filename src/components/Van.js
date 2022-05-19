import React, { useContext } from "react";
import Products from "./Products";
import DataContext from "../context/DataContext";
import Pagination from "./Pagination";
import productBanner from "../images/vansBanner.bmp";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import "../css/AllProducts.css";

function Van() {
  const {
    vanProducts,
    GetUserUid,
    addToCart,
    productsPerPage,
    paginate,
    indexOfFirstProduct,
    indexOfLastProduct,
    filterOptions,
    handleOption,
    getVansFiltered,
  } = useContext(DataContext);
  const currentProducts = vanProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  return (
    <div className="allProducts">
      <img className="productBanner" src={productBanner} alt="" />
      <h1>Vans Products</h1>
      <Select
        options={filterOptions}
        onChange={(option) => handleOption(option.label)}
        placeholder="Filter By Price"
      />
      <Button variant="primary" onClick={getVansFiltered}>
        Filter By Price
      </Button>
      <Products
        products={currentProducts}
        GetUserUid={GetUserUid}
        addToCart={addToCart}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={vanProducts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Van;
