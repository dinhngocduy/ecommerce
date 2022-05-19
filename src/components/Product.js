import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Product.css";
import DataContext from "../context/DataContext";

function Product({ product, addToCart, isAdmin }) {
  const { handleDeleteProduct } = useContext(DataContext);
  const addToBasket = () => {
    addToCart(product);
  };
  const deleteProduct = () => {
    handleDeleteProduct(product);
  };
  return (
    <Card className="product">
      <Link to={`/productDetail/${product.id}`}>
        <Card.Img variant="top" src={product.url} />
      </Link>
      <Card.Body>
        <Link to={`/productDetail/${product.id}`} className="product__Link">
          <Card.Title className="product__title">{product.title}</Card.Title>
          <hr></hr>
          {product.sale ? (
            <div className="product__price">
              <Card.Title className="product__initialPrice">
                {product.oldPrice}$
              </Card.Title>

              <Card.Title className="product__salePrice">
                {product.price}$
              </Card.Title>
            </div>
          ) : (
            <div className="product__price">
              <Card.Title>{product.price}$</Card.Title>
            </div>
          )}
        </Link>

        <div className="product__button">
          <Button variant="primary" onClick={addToBasket}>
            Add To Cart
          </Button>
          <Link to={`/productDetail/${product.id}`}>
            <Button variant="primary">Details</Button>
          </Link>
          {isAdmin && (
            <Button
              className="deleteButton"
              onClick={deleteProduct}
              variant="primary"
            >
              Delete
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
