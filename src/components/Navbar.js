import React, { useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
function Navbar({ isAdmin }) {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="navbar">
      <div className={active ? "navbar__content" : "navbar__contentNonActive"}>
        <Link to="/" className="navbar__option">
          <span className="navbar__optionLineTwo">Home</span>
        </Link>
        <Link to="/vans" className="navbar__option">
          <span className="navbar__optionLineTwo">Vans</span>
        </Link>
        <Link to="/converse" className="navbar__option">
          <span className="navbar__optionLineTwo">Converse</span>
        </Link>
        <Link to="/sale" className="navbar__option">
          <span className="navbar__optionLineTwo">Sale</span>
        </Link>
        <Link to="/orders" className="navbar__option">
          <span className="navbar__optionLineOne">Old</span>
          <span className="navbar__optionLineTwo"> Orders</span>
        </Link>
        <Link to="/accountDetails" className="navbar__option">
          <span className="navbar__optionLineOne">Account </span>
          <span className="navbar__optionLineTwo">Details</span>
        </Link>
        <Link to="/allProducts" className="navbar__option">
          <span className="navbar__optionLineOne">All </span>
          <span className="navbar__optionLineTwo">Products</span>
        </Link>
        {isAdmin && (
          <Link to="/admin" className="navbar__option">
            <span className="navbar__optionLineOne">Admin </span>
            <span className="navbar__optionLineTwo">Panel</span>
          </Link>
        )}
      </div>

      {active ? (
        <CancelIcon className="navbar__menuIcon" onClick={handleClick} />
      ) : (
        <MenuIcon className="navbar__menuIcon" onClick={handleClick} />
      )}
    </div>
  );
}

export default Navbar;
