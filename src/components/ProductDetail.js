import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import EditProduct from "./EditProduct";
import "../css/ProductDetail.css";
import DetailedDescription from "./DetailedDescription";
import Comments from "./Comments";
import RelatedProducts from "./RelatedProducts";
import InputNumber from "react-input-number";

import NumericInput from "react-numeric-input";
function ProductDetail({ isAdmin }) {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const {
    products,
    addToCart,
    sizeOptions,
    value,
    setValue,
    quantity,
    setQuantity,
  } = useContext(DataContext);
  const product = products.find((product) => product.id === id);
  const addToBasket = () => {
    if (quantity > product.quantity) {
      alert("Your Desired quantity is larger than our number of products left");
      setQuantity(1);
    } else {
      addToCart(product);
      setQuantity(1);
    }
  };

  const handleOption = (obj) => {
    setValue(obj);
  };
  const handleAdminEdit = () => {
    setEdit(true);
  };

  return product ? (
    <div className="productDetail">
      <div className="productDetail_info">
        <img className="detail__image" src={product.url} alt="" />

        {edit ? (
          <EditProduct product={product} edit={edit} setEdit={setEdit} />
        ) : (
          <div className="detail__info">
            <div className="detail__titleAndType">
              <h1 className="detail__title">{product.title}</h1>
              <b>
                Trademark: {product.type} |{" "}
                <span>Product Code: {product.id}</span>
              </b>
            </div>
            <h2 className="productDetail__price">
              Price: <span className="detail__price"> {product.price}$</span>
            </h2>
            <p className="details">{product.description}</p>
            <h3>Size</h3>
            <Select
              options={sizeOptions}
              onChange={(option) => handleOption(option.label)}
              placeholder="Choose Your Size"
            />
            <div className="quantity">
              <p className="quantityLabel">Quantity:</p>

              <div>
                <NumericInput
                  className="quantityInput"
                  min={1}
                  max={product.quantity}
                  step={1}
                  value={quantity}
                  mobile
                  onChange={setQuantity}
                />
                <p className="quantityLeft">{product.quantity} left</p>
              </div>
            </div>
            <Button className="detail__button" onClick={addToBasket}>
              Add To Cart
            </Button>
            {isAdmin && (
              <Button className="detail__button" onClick={handleAdminEdit}>
                Edit Product
              </Button>
            )}
          </div>
        )}
      </div>
      <DetailedDescription product={product} />
      <Comments product={product} />
      <RelatedProducts product={product} addToCart={addToCart} />
    </div>
  ) : (
    <h1>Please Wait...</h1>
  );
}

export default ProductDetail;
