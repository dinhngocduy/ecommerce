import React, { useContext } from "react";
import Products from "./Products";
import DataContext from "../context/DataContext";
import productBanner from "../images/converseBanner.bmp";
import Pagination from "./Pagination";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import "../css/AllProducts.css";
function Converse() {
  const {
    converseProducts,
    GetUserUid,
    addToCart,
    productsPerPage,
    paginate,
    indexOfFirstProduct,
    indexOfLastProduct,
    handleOption,
    filterOptions,
    getConverseFiltered,
  } = useContext(DataContext);
  const currentProducts = converseProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="allProducts">
      <img className="productBanner" src={productBanner} alt="" />
      <h1>Converse Products</h1>
      <Select
        options={filterOptions}
        onChange={(option) => handleOption(option.label)}
        placeholder="Filter By Price"
      />
      <Button variant="primary" onClick={getConverseFiltered}>
        Filter By Price
      </Button>
      <Products
        products={currentProducts}
        GetUserUid={GetUserUid}
        addToCart={addToCart}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={converseProducts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Converse;
