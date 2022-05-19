import React, { useContext } from "react";
import "../css/Pagination.css";
import Pagination1 from "react-bootstrap/Pagination";
import DataContext from "../context/DataContext";
function Pagination({ productsPerPage, totalProducts, paginate }) {
  const pageNumbers = [];
  const { currentPage } = useContext(DataContext);
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className={
                currentPage === number ? "page-link active" : "page-link"
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
