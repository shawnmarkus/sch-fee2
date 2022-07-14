import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntryForm from "./component/EntryForm2";
import Home from "./component/Home.js";
import Navbar from "./component/Navbar";
import View from "./component/Viewlog3";
import "./App.css";
import UpdateEntry from "./component/UpdateEntry3";
import ErrorPage from "./component/ErrorPage.js";
import Login from "./component/Login";
import { ContextBody } from "./component/ContextBody";

function Router() {
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, [loginState]);

  return (
    <BrowserRouter>
      <div className="container">
        <ContextBody.Provider value={[loginState, setLoginState]}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/createEntry" element={<EntryForm />} />
            <Route exact path="/viewlog" element={<View />} />
            <Route exact path="/updateEntry" element={<UpdateEntry />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="*" element={<ErrorPage />} />
          </Routes>
        </ContextBody.Provider>
      </div>
    </BrowserRouter>
  );
}

export default Router;
