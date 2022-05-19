import React, { useState, useContext } from "react";
import loginLogo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { auth } from "../Config/Config";
import Alert from "react-bootstrap/Alert";
import DataContext from "../context/DataContext";
import "../css/Login.css";

function Login() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword } = useContext(DataContext);

  const [flag, setFlag] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSignIn(e) {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={loginLogo} alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form className="login__form" action="" onSubmit={handleSignIn}>
          <h5>Email</h5>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            className="form-control"
            placeholder="Atleast 8 letters, with a capital letter and a number"
            pattern="^(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <Button type="submit" variant="warning">
            Sign In
          </Button>
          <Link className="forgetPassword" to="/forgetPassword">
            Forget Your Password?
          </Link>
          <h5 className="login__warning">
            By continuing, you agree to Our Conditions of Use and Privacy
            Notice.
          </h5>
          <Link to="/register">
            <Button variant="secondary">Create Your Account</Button>
          </Link>
          {flag && (
            <Alert className="register__alert" variant="danger">
              Please Check Your Infomation Again!
            </Alert>
          )}
          {success && (
            <Alert className="register__alert" variant="success">
              Successful!
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
