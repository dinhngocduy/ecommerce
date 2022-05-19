import "../css/ChangePassword.css";
import React, { useState } from "react";
import loginLogo from "../images/loginLogo.svg";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { auth } from "../Config/Config";
import { EmailAuthProvider, updatePassword } from "firebase/auth";

function ChangePassword() {
  const [authUser, setAuthUser] = useState(false);
  const [flag, setFlag] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const user = auth.currentUser;
  const handleAuth = (e) => {
    e.preventDefault();

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        setAuthUser(true);
      })
      .catch((error) => {
        setError(error);
        alert(error);
      });
  };
  const handleReset = (e) => {
    e.preventDefault();
    updatePassword(user, newPassword)
      .then(() => {
        setFlag(true);
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div className="forgetPassword">
      <Link to="/">
        <img className="login__logo" src={loginLogo} alt="" />
      </Link>
      <h1>Change Your Password</h1>

      <div className="login__container">
        {authUser ? (
          <form className="login__form" onSubmit={handleReset} action="">
            <h5>Enter Your New Password</h5>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your New Password"
              value={newPassword}
              pattern="^(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
              onChange={(event) => setNewPassword(event.target.value)}
            />

            <Button type="submit" variant="warning">
              Reset Password
            </Button>

            {flag && (
              <Alert className="register__alert" variant="success">
                Reset Successful
              </Alert>
            )}
          </form>
        ) : (
          <form className="login__form" onSubmit={handleAuth} action="">
            <h5>Enter Your Current Password</h5>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Current Password"
              onChange={(event) => setCurrentPassword(event.target.value)}
            />

            <Button type="submit" variant="warning">
              Confirm
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
