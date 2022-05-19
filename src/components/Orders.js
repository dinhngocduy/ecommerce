import React, { useState, useEffect } from "react";
import "../css/Orders.css";
import { useStateValue } from "../StateProvider";
import { auth, fs } from "../Config/Config";
import Order from "./Order";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(async () => {
    if (user) {
      const uid = auth.currentUser.uid;

      const products = await fs
        .collection("users")
        .doc(uid)
        .collection("orders")
        .orderBy("detailedDate", "desc")
        .get();
      const productsArray = [];
      for (let snap of products.docs) {
        let data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setOrders(productsArray);
        }
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__orders">
        {orders?.map((order) => (
          <Order key={order.ID} order={order} orders={orders} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
