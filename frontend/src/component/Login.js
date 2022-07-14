/** @format */
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";
import { ContextBody } from "./ContextBody";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useContext(ContextBody);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    console.log(uname.value, pass.value);
    //it is for send data to server to check login
    axios
      .post(
        "/login",
        {
          username: uname.value,
          password: pass.value,
        }
        // { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.name == "uname" || res.data.name == "pass") {
          setErrorMessages(res.data);
        } else {
          window.localStorage.setItem("token", res.data.token);
          setLoggedIn(true);
          navigate("/");
        }

        //my change

        // this.props.history.push("/home");
        // return <Redirect to="/home" />;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;
