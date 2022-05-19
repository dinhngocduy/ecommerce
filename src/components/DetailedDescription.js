import React from "react";
import "../css/DetailedDescription.css";
function DetailedDescription({ product }) {
  return (
    <div className="detailedDescription">
      <div className="detailedDescription__title">
        <p>Description</p>
      </div>

      <div className="detailedDescription__content">
        <p className="">{product.detailDescription}</p>
      </div>
    </div>
  );
}

export default DetailedDescription;
