import React, { useContext, useState } from "react";
import Products from "./Products";
import DataContext from "../context/DataContext";
import Pagination from "./Pagination";
import productBanner from "../images/allProductBanner.bmp";
import { auth, fs, storage } from "../Config/Config";
import Select from "react-select";
import Button from "react-bootstrap/Button";

import "../css/AllProducts.css";
function AllProducts({ isAdmin }) {
  const {
    products,
    GetUserUid,
    addToCart,
    productsPerPage,
    currentPosts,
    paginate,
    searchResult,
    setProducts,
    getFiltered,
    filterValue,
    setFilterValue,
    filterOptions,
    handleOption,
  } = useContext(DataContext);

  return (
    <div className="allProducts">
      <img className="productBanner" src={productBanner} alt="" />
      <h1>All Products</h1>
      <Select
        options={filterOptions}
        onChange={(option) => handleOption(option.label)}
        placeholder="Filter By Price"
      />
      <Button variant="primary" onClick={getFiltered}>
        Filter By Price
      </Button>
      <Products
        products={currentPosts}
        GetUserUid={GetUserUid}
        addToCart={addToCart}
        isAdmin={isAdmin}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  );
}

export default AllProducts;
