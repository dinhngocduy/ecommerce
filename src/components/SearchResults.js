import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import Products from "./Products";
function SearchResults() {
  const {
    products,
    cartProducts,
    search,
    setSearch,
    searchResults,
    setSearchResults,
    addToCart,
    filterProduct,
  } = useContext(DataContext);

  return (
    <div className="searchResults">
      <h1>Search Results For {search}: </h1>
      <Products products={searchResults} addToCart={addToCart} />
    </div>
  );
}

export default SearchResults;
