import React from "react";
import style from "../css/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import CustomImage from "./CustomImage";

const Home = () => {
  const navigate = useNavigate();
  //shivamsingh
  useEffect(() => {
    // Code here will run just like componentDidMount
    if (!window.localStorage.getItem("token")) {
      //redirect to Login
      console.log("redirect to login");
      // this.props.history.push("/createEntry");
      navigate("./login");
    }
  }, []);

  const loadCreateNewEntry = (e) => {
    console.log("you clicked");
    let path = `/${e.target.getAttribute("data-value")}`;
    console.log(e.target.getAttribute("data-value"));
    navigate(path);
  };

  return (
    <div className={style.containerHome}>
      <div className={style.lftHeader}>
        <div>schoolName</div>
        <div>feesdashBoard</div>
        <div>
          {/* <CustomImage /> */}
          {/* <img src="" alt={items[1].name} /> */}
        </div>
      </div>
      <section className={style.right}>
        <div className={style.optionBoxDiv}>
          <h2
            style={{
              padding: "10px",
            }}
          >
            Choose options
          </h2>
          <div className={style.grp}>
            <div
              style={{
                borderWidth: "0 1px 0 0",
                borderColor: "black",
                borderStyle: "solid",
              }}
            >
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div
              className={style.eve_button}
              data-value="createEntry"
              onClick={loadCreateNewEntry}
            >
              create a new entry
            </div>
          </div>
          <div className={style.grp}>
            <div
              style={{
                borderWidth: "0 1px 0 0",
                borderColor: "black",
                borderStyle: "solid",
              }}
            >
              <i className="fa-pen-clip fa-solid"></i>
            </div>
            <div
              className={style.eve_button}
              data-value="updateEntry"
              onClick={loadCreateNewEntry}
            >
              update an entry
            </div>
          </div>
          <div className={style.grp}>
            {" "}
            <div
              style={{
                borderWidth: "0 1px 0 0",
                borderColor: "black",
                borderStyle: "solid",
              }}
            >
              <i className="fa-solid fa-users"></i>
            </div>
            <div
              className={style.eve_button}
              data-value="viewlog"
              onClick={loadCreateNewEntry}
            >
              view the logs
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
