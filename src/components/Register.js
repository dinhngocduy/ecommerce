import React, { useContext } from "react";
import DataContext from "../context/DataContext";

import loginLogo from "../images/logo.png";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { auth, fs } from "../Config/Config";
import Button from "react-bootstrap/Button";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    repeatNewPassword,
    setRepeatNewPassword,
    success,
    setSuccess,
    flag,
    setFlag,
  } = useContext(DataContext);

  function handleFormSubmit(e) {
    e.preventDefault();
    const createdDate = new Date();
    if (!email || !password) {
      setFlag(true);
      setSuccess(false);
    } else if (password !== repeatNewPassword) {
      setFlag(true);
      setSuccess(false);
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          setFlag(false);
          setSuccess(true);
          fs.collection("users")
            .doc(auth.user.uid)
            .set({
              Email: email,

              userRole: ["user"],
              created: createdDate.getTime(),
            });
          navigate("/login");
        })
        .catch((error) => alert(error.message));
    }
  }
  return (
    <div className="register">
      <Link to="/">
        <img className="register__logo" src={loginLogo} alt="" />
      </Link>
      <h1 className="welcome">Welcome To Duy's Personal Shoe Store</h1>

      <div className="register__container">
        <h1>Create An Account</h1>
        <form className="register__form" action="" onSubmit={handleFormSubmit}>
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
          <h5>Re-enter Your Password</h5>
          <input
            type="password"
            className="form-control"
            placeholder="Re Enter password"
            pattern="^(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
            onChange={(event) => setRepeatNewPassword(event.target.value)}
          />
          <br />
          <Button type="submit" variant="warning">
            Sign Up
          </Button>
          <h5 className="register__warning">
            By continuing, you agree to Our Conditions of Use and Privacy
            Notice.
          </h5>
          <Link to="/login">
            <Button variant="secondary">Already Had An Account? Sign In</Button>
          </Link>

          {flag && (
            <Alert className="register__alert" variant="danger">
              I got it you are in hurry! But every Field is important!
            </Alert>
          )}
          {success && (
            <Alert className="register__alert" variant="success">
              Sign Up Success
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
