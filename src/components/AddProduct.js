import React, { useState } from "react";
import { storage, fs } from "../Config/Config";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Alert from "react-bootstrap/Alert";

import "../css/AddProduct.css";
function AddProduct() {
  toast.configure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailDescription, setDetailDescription] = useState("");

  const [price, setPrice] = useState();
  const [oldPrice, setOldPrice] = useState();
  const [quantity, setQuantity] = useState();

  const [image, setImage] = useState(null);
  const [type, setType] = useState("Converse");
  const [sale, setSale] = useState(true);
  const [productID, setProductID] = useState("");

  const [featured, setFeatured] = useState(true);

  const [imageError, setImageError] = useState(false);

  const [uploadError, setUploadError] = useState("");

  const types = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/PNG",
    "image/WEBP",
    "image/webp",
  ];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError(false);
      } else {
        setImage(null);
        setImageError(true);
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    // console.log(title, description, price);
    // console.log(image);
    const uploadTask = storage.ref(`product-images/${productID}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("product-images")
          .child(productID)
          .getDownloadURL()
          .then((url) => {
            fs.collection("Products")
              .doc(productID)
              .set({
                title,
                description,
                price: sale
                  ? Number(price) - (Number(price) * oldPrice) / 100
                  : Number(price),
                quantity: Number(quantity),
                url,
                detailDescription,
                sale: JSON.parse(sale),
                featured: JSON.parse(featured),
                id: productID,
                type,
                oldPrice: Number(price),
                created: new Date().getTime(),
              })
              .then(() => {
                toast.success("Product Added!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                });
                setTitle("");
                setDescription("");
                setPrice("");
                setDetailDescription("");
                setOldPrice("");
                setProductID("");
                setQuantity("");
              })
              .catch((error) => setUploadError(error.message));
          });
      }
    );
  };

  return (
    <div className="addProduct">
      <h1>Add Products</h1>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="productId">Product ID:</label>
            <input
              type="text"
              name="productId"
              id="productId"
              className="form-control"
              value={productID}
              onChange={(e) => {
                setProductID(e.target.value);
              }}
            ></input>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="form-control"
              value={quantity}
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
              className="form-control"
              value={price}
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
              value={description}
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
              value={detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="addProduct__productInput">
            <label htmlFor="file">Product Image:</label>
            <input
              type="file"
              name="file"
              id="file"
              className="form-control"
              required
              onChange={handleProductImg}
            ></input>
            {imageError && (
              <Alert variant="danger">
                Please select the correct type of image
              </Alert>
            )}
          </div>

          <Button type="submit" variant="warning">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
