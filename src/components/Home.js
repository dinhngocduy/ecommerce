import React, { useContext } from "react";
import "../css/Home.css";
import Category from "./Category";
import Products from "./Products";
import Slide from "./Slide";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

import NewArrivals from "./NewArrivals";
import DataContext from "../context/DataContext";

function Home() {
  toast.configure();
  const { products, GetUserUid, featuredProducts, addToCart } =
    useContext(DataContext);

  const [{}, dispatch] = useStateValue();

  return (
    <div className="home">
      <Slide />
      <Category />
      <NewArrivals products={products} addToCart={addToCart} />
      {products.length > 0 && (
        <div className="products">
          <h1 className="title">Featured Products</h1>
          <Products
            GetUserUid={GetUserUid}
            products={featuredProducts}
            addToCart={addToCart}
          />
        </div>
      )}
      {products.length < 1 && <h1>Please Wait...</h1>}
      <Link to="/allProducts">
        <Button variant="dark">See All Products</Button>
      </Link>
    </div>
  );
}

export default Home;
