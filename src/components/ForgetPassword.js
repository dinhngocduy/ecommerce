import React, { useState, useContext } from "react";
import loginLogo from "../images/loginLogo.svg";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../css/ForgetPassword.css";
import { auth } from "../Config/Config";
import DataContext from "../context/DataContext";

function ForgetPassword() {
  const [flag, setFlag] = useState("");
  const { email, setEmail } = useContext(DataContext);

  const handleReset = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setFlag(true);
      })
      .catch(function (error) {
        alert(error);
      });
  };
  return (
    <div className="forgetPassword">
      <Link to="/">
        <img className="login__logo" src={loginLogo} alt="" />
      </Link>
      <h1>Forgot Your Password?</h1>

      <div className="login__container">
        <form className="login__form" onSubmit={handleReset} action="">
          <h5>Enter Your Email</h5>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <Button type="submit" variant="warning">
            Reset Password
          </Button>

          {flag && (
            <Alert className="register__alert" variant="success">
              A Password Reset Email Has Been Send To Your Email!
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
