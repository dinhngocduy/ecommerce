import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import "../css/Order.css";
function Order({ order, orders }) {
  return (
    <div className="order">
      <h1>Order</h1>
      <small>Order ID: {order.ID}</small>

      <p>{order.created}</p>

      <div>
        {order.basket?.map((item) => (
          <CheckoutProduct hideButton key={item.id} basketItem={item} />
        ))}
      </div>
      <h3 className="order__total">Order Totals: $ {order.totalPrice}</h3>
    </div>
  );
}

export default Order;
