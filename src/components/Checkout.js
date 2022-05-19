import React, { useContext } from "react";
import "../css/Checkout.css";
import Ad from "../images/Ad.bmp";
import Subtotal from "./Subtotal";
import DataContext from "../context/DataContext";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import CheckoutProduct from "./CheckoutProduct";
import { getBasketTotal } from "../reducer";
import { toast } from "react-toastify";
import { useStateValue } from "../StateProvider";

import "react-toastify/dist/ReactToastify.css";
import { auth, fs } from "../Config/Config";
function Checkout() {
  const { cartProducts } = useContext(DataContext);

  const totalPrice = getBasketTotal(cartProducts);
  const [{ user }, dispatch] = useStateValue();

  toast.configure();
  const navigate = useNavigate();
  const handleToken = async (token) => {
    const cart = { name: "All Products", totalPrice };
    const date = new Date();

    const response = await axios.post("http://localhost:8080/checkout", {
      token,
      cart,
    });

    let { status } = response.data;

    if (status === "success") {
      navigate("/orders");
      toast.success("Your order has been placed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      let uid = auth.currentUser.uid;

      const id = fs.collection("users").doc(uid).collection("orders").doc().id;
      fs.collection("users")
        .doc(uid)
        .collection("orders")
        .doc(id)
        .set({
          basket: cartProducts,
          totalPrice: totalPrice,
          created: date.toDateString() + " " + date.toTimeString(),
          detailedDate: new Date().getTime(),
        });
      cartProducts.map((cartProduct) => {
        fs.collection("soldProducts").add({
          cartProduct,
          created: date.getTime(),
          quantity: cartProduct.quantity,
        });
      });
      const carts = await fs.collection("Cart" + uid).get();

      for (var snap of carts.docs) {
        fs.collection("Cart" + uid)
          .doc(snap.id)
          .delete();
      }
    } else {
      alert("Something went wrong in checkout");
    }
    return totalPrice;
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src={Ad} className="checkout__ad" alt="" />
        <div className="checkout__leftBasket">
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {cartProducts.map((basketItem) => (
            <CheckoutProduct key={basketItem.id} basketItem={basketItem} />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal cartProducts={cartProducts} handleToken={handleToken} />
      </div>
    </div>
  );
}

export default Checkout;
