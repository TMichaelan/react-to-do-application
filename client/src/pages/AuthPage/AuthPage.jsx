import React, { useState, useContext } from "react";
import axios from "axios";
import "./AuthPage.scss";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

let changeHand;
let registerHand;
let loginHand;

export default function AuthPage() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const registerHandler = async () => {
    try {
      await axios
        .post(
          "/api/auth/registration",
          { ...form },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => console.log(response));
    } catch (err) {
      console.log(err);
    }
  };

  const loginHandler = async () => {
    try {
      await axios
        .post(
          "/api/auth/login",
          { ...form },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          login(response.data.token,response.data.userId)
        });
    } catch (err) {
      console.log(err);
    }
  };

  changeHand = changeHandler;
  registerHand = registerHandler;
  loginHand = loginHandler;

  return (
    <div className="container">
      <div className="auth-page">
        <Routes>
          <Route path="login" element={<SignIn />} />
          <Route path="registration" element={<SignUp />} />
          
        </Routes>
      </div>
    </div>
  );
}

function SignUp() {
  return (
    <div>
      <h3>Sign Up</h3>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="email"
              name="email"
              className="validate"
              onChange={changeHand}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              type="password"
              name="password"
              className="validate"
              onChange={changeHand}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <button
            className="wawes-effect wawes-light btn  blue"
            onClick={registerHand}
          >
            Sign Up
          </button>
          <Link to="/login" className="btn-outline btn-reg">
            Already have an account? Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

function SignIn() {
  return (
    <div>
      <h3>Log In</h3>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="email"
              name="email"
              className="validate"
              onChange={changeHand}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              type="password"
              name="password"
              className="validate"
              onChange={changeHand}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <button
            className="wawes-effect wawes-light btn btn blue"
            onClick={loginHand}
          >
            Log In
          </button>
          <Link to="/registration" className="btn-outline btn-reg">
            Sign Up for free
          </Link>
        </div>
      </form>
    </div>
  );
}
