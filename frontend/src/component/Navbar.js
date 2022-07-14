import React, { useContext } from "react";
import style from "../css/NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import { ContextBody } from "./ContextBody";

const Navbar = () => {
  const [loginState, setLoginState] = useContext(ContextBody);
  const navigate = useNavigate();
  return (
    <div className={style.navbarmaster}>
      <nav>
        <div className={style.titleName}>
          {/* <NavLink className={style.NavlinkStyle} to="/"> */}
          Dashboard
          {/* </NavLink> */}
        </div>
        <div className={style.menu_list}>
          <NavLink className={style.NavlinkStyle} to="/">
            Home
          </NavLink>

          <NavLink
            className={style.NavlinkStyle}
            onClick={() => {
              if (loginState) {
                alert("are you sure to LogOut");
                window.localStorage.removeItem("token");
                setLoginState(false);
                navigate("/login");
              }
            }}
            to="/login"
          >
            <div>{loginState ? "logout" : "login"}</div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
