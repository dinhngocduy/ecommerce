import React, { useState, useEffect } from "react";
import { auth, fs, storage } from "../Config/Config";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../css/AccountDetails.css";
function AccountDetails() {
  const [userNow, setUserNow] = useState("");

  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState();
  const [birthday, setBirthday] = useState("");
  const [imageUrl, setImageUrl] = useState(userNow.profileImage);
  const [imageError, setImageError] = useState("");
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const user = auth.currentUser;
  toast.configure();
  useEffect(async () => {
    const user = auth.currentUser;
    const userNow = await fs.collection("users").doc(user.uid).get();
    const userData = userNow.data();
    setUserNow(userData);
    console.log(userNow.profileImage);
  }, [user]);

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

  const handleConfirm = (e) => {
    e.preventDefault();
    // console.log(title, description, price);
    // console.log(image);
    const uploadTask = storage.ref(`users-images/${user.uid}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => console.log(error.message),
      () => {
        storage
          .ref("users-images")
          .child(user.uid)
          .getDownloadURL()
          .then((url) => {
            fs.collection("users")
              .doc(user.uid)
              .update({
                username: username ? username : userNow.username,
                birthday: birthday ? birthday : userNow.birthday,
                Email: email ? email : userNow.Email,
                profileImage: url,
              })
              .then(async () => {
                const userNow = await fs
                  .collection("users")
                  .doc(user.uid)
                  .get();
                const userData = userNow.data();
                setUserNow(userData);
                toast.success("Your Account Details Has Been Updated!", {
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
          });
      }
    );
  };

  return user ? (
    <div className="accountDetails">
      <div className="userProfileImage">
        <img src={userNow.profileImage} alt="" className="userImage" />
      </div>

      <div className="userForm">
        <form onSubmit={handleConfirm}>
          <div className="userDetails">
            <div className="userInput">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="userInput">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="form-control"
                defaultValue={userNow.username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>

            <div className="userInput">
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="birthday"
                name="birthday"
                id="birthday"
                className="form-control"
                defaultValue={userNow.birthday}
                onChange={(e) => setBirthday(e.target.value)}
              ></input>
            </div>
            <div className="userInput">
              <label htmlFor="file">Profile Image:</label>
              <input
                type="file"
                name="file"
                id="file"
                className="form-control"
                required
                onChange={handleProductImg}
              ></input>
            </div>
            <Link to="/changePassword">Change Password</Link>
            <Button type="submit" variant="warning">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <h1>Please Wait</h1>
  );
}

export default AccountDetails;
