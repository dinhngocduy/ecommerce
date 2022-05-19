import React, { useContext } from "react";
import "../css/CheckoutProduct.css";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../StateProvider";
import { auth, fs } from "../Config/Config";
import DataContext from "../context/DataContext";

function CheckoutProduct({ basketItem, hideButton }) {
  const [{ user }, dispatch] = useStateValue();
  const { products } = useContext(DataContext);

  const product = products.find((product) => product.id === basketItem.id);

  const removeFromBasket = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart" + user.uid)
          .doc(basketItem.id)
          .delete()
          .then(() => {
            fs.collection("Products")
              .doc(product.id)
              .update({
                quantity: product.quantity + basketItem.quantity,
              })
              .then(() => {
                console.log("Susscess");
              });
          });
      }
    });
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: basketItem.id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__img" src={basketItem.url} alt="" />
      <div className="checkoutProduct__info">
        <div className="checkoutProduct__infoNamePrice">
          <h3 className="checkoutProduct__title">{basketItem.title}</h3>
          <p className="checkoutProduct__title">{basketItem.Size}</p>
          <p className="checkoutProduct__title">
            Quantity: {basketItem.quantity}
          </p>

          <h4 className="checkoutProduct__price">
            Price: ${basketItem.price * basketItem.quantity}
          </h4>
        </div>
        {!hideButton && (
          <Button
            onClick={removeFromBasket}
            className="checkoutProduct__button"
            variant="warning"
          >
            Remove From Basket
          </Button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
