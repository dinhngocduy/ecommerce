import React, { useState } from "react";
import { storage, fs } from "../Config/Config";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import "../css/AddProduct.css";

function EditProduct({ product, edit, setEdit }) {
  toast.configure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailDescription, setDetailDescription] = useState("");
  const [quantity, setQuantity] = useState();

  const [price, setPrice] = useState();
  const [oldPrice, setOldPrice] = useState();

  const [image, setImage] = useState(null);
  const [type, setType] = useState("Converse");
  const [sale, setSale] = useState(true);
  const [productID, setProductID] = useState("");

  const [featured, setFeatured] = useState(true);

  const [imageError, setImageError] = useState("");

  const [uploadError, setUploadError] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("please select a valid image file type (png or jpg)");
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    fs.collection("Products")
      .doc(product.id)
      .update({
        title: title ? title : product.title,

        oldPrice: Number(price),
        price: sale
          ? Number(price) - (Number(price) * oldPrice) / 100
          : Number(price),
        quantity: quantity ? Number(quantity) : Number(product.quantity),

        sale: JSON.parse(sale),
        featured: featured
          ? JSON.parse(featured)
          : JSON.parse(product.featured),
        type: type ? type : product.type,
        description: description ? description : product.description,
        detailDescription: detailDescription
          ? detailDescription
          : product.detailDescription,
      })
      .then(() => {
        setEdit(false);

        toast.success("Your Product Details Has Been Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="editProduct">
      <h1>Edit Product</h1>
      <hr></hr>
      <form onSubmit={handleAddProducts}>
        <div className="addProduct__Details">
          <div className="addProduct__productInput">
            <label htmlFor="title">Product Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              defaultValue={product.title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>

          <div className="addProduct__productInput">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="form-control"
              defaultValue={product.quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          {sale === true ? (
            <div className="addProduct__productInput">
              <label htmlFor="oldPrice">Percent Discount:</label>
              <input
                type="number"
                name="oldPrice"
                id="oldPrice"
                placeholder="Enter Discount"
                className="form-control"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
              ></input>
            </div>
          ) : (
            <div className="addProduct__productInput">
              <label htmlFor="oldPrice">Percent Discount:</label>
              <input
                type="number"
                name="oldPrice"
                id="oldPrice"
                placeholder="Enter Discount"
                className="form-control"
                value={oldPrice}
                disabled
                onChange={(e) => setOldPrice(e.target.value)}
              ></input>
            </div>
          )}
          <div className="addProduct__productInput">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              step="0.001"
              className="form-control"
              defaultValue={product.price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="addProduct__sale">Sale:</label>
            <select
              id="addProduct__sale"
              name="addProduct__sale"
              className="addProduct__options"
              onChange={(e) => setSale(JSON.parse(e.target.value))}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="addProduct__featured">Featured:</label>
            <select
              id="addProduct__featured"
              name="addProduct__featured"
              className="addProduct__options"
              onChange={(e) => setFeatured(e.target.value)}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="addProduct__type">Type:</label>
            <select
              id="addProduct__type"
              name="addProduct__type"
              className="addProduct__options"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Converse">Converse</option>
              <option value="van">van</option>
            </select>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              type="text"
              name="productDescription"
              id="productDescription"
              className="form-control"
              defaultValue={product.description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="productDetailDescription">
              Detail Description:
            </label>
            <textarea
              type="text"
              name="productDetailDescription"
              id="productDetailDescription"
              className="form-control"
              defaultValue={product.detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
            ></textarea>
          </div>

          <Button type="submit" variant="warning">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
