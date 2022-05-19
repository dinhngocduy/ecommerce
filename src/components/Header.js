import React, { useContext, useEffect, useState } from "react";
import "../css/Header.css";
import logo from "../images/labryLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useStateValue } from "../StateProvider";
import { auth } from "../Config/Config";
import DataContext from "../context/DataContext";

function Header() {
  const {
    products,
    cartProducts,
    search,
    setSearch,
    searchResults,
    setSearchResults,
    handleSearch,
  } = useContext(DataContext);

  const [{ user }] = useStateValue();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
      window.reload();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="" />
      </Link>
      <form className="header__search" onSubmit={handleSearch}>
        <input
          className="header__searchInput"
          required
          type="text"
          name=""
          id=""
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon className="header__searchIcon" />
      </form>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">
            Hello {!user ? "" : user.email}
          </span>
          <span className="header__optionLineTwo">
            {user ? (
              <Link className="sign" onClick={handleAuth} to="/">
                Sign Out
              </Link>
            ) : (
              <Link className="sign" to="/login">
                Sign In
              </Link>
            )}
          </span>
        </div>

        <Link to="/checkout" className="header__optionBasket">
          <ShoppingBasketIcon />
          <span
            id="header__basketCount"
            className="header__optionLineTwo header__basketCount"
          >
            {cartProducts?.length}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
