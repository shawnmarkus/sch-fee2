import React, { useEffect, useState } from "react";
import DataCard from "./DataCard";
import DataCard2 from "./DataCard2";
import style from "../css/View.module.css";
import $ from "jquery";
import { cls, monthArrayList } from "./data";
import axios from "axios";

const Viewlog = () => {
  const [resDataForUsr, setResDataForUsr] = useState([]);
  const [resData, setResData] = useState([]);

  const [showData, setShowData] = useState(false); // to show the data against Date
  const [showDataFroUsr, setShowDataForUsr] = useState(false); // to show the data table againt cls,year

  // its to get the query data
  const [getQueryData, setQueryData] = useState({
    Name: "",
    year: "",
    cls: "",
    monthName: "",
  });
  const [submissionDate, setSubmissionDate] = useState("");

  useEffect(() => {
    console.log("From useEffect " + resDataForUsr);
    if (resData.length) {
      setShowData(true);
    } else {
      console.log("remove the content for admin");
      setShowData(false);
    }

    if (resDataForUsr.length) {
      setShowDataForUsr(true);
    } else {
      setShowDataForUsr(false);
    }
  }, [resData, resDataForUsr]);

  const handleClickSubmit = async (e) => {
    // to get data
    const { Name, year, cls, monthName } = getQueryData;
    let url;
    {
      Name && monthName
        ? (url = `/userEntry/?year=${year}&cls=${cls}&Name=${Name}&months=${monthName}`)
        : Name
        ? (url = `/userEntry/?year=${year}&cls=${cls}&Name=${Name}`)
        : monthName
        ? (url = `/userEntry/?year=${year}&cls=${cls}&months=${monthName}`)
        : (url = `/userEntry/?year=${year}&cls=${cls}`);
    }

    // creating url based on query
    console.log(url);
    //night update
    if (window.localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("token");
    }
    //nigth update end
    // making request
    const res = await fetch(url, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        resp.obj.length ? setResDataForUsr(resp.obj) : alert("No Record found");
      });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    // reset the value of form
    setQueryData({
      Name: "",
      year: "",
      cls: "",
      monthName: "",
    });
    // reset the monthName
    $("select").val("");
    setResDataForUsr([]);
  };

  const handleChangeOfSelect = (e) => {
    setQueryData({ ...getQueryData, monthName: e.target.value });
  };

  // -----------------------------------------------------------admin---------------------------------------------

  const handleButtonClick = async () => {
    let url = `/adminView/?submissionDate=${submissionDate}`;
    console.log(submissionDate, url);
    //night update
    if (window.localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("token");
    }
    //nigth update end
    const response = await axios
      .get(url)
      .then((response) => response.data.obj)
      .then((finalData) => {
        if (finalData.length) {
          setResData(finalData);
        } else {
          alert("No Records found");
        }
      })
      .catch((error) => {
        console.log("throw error" + error);
      });
  };

  const handleAdminBtnSubmit = (e) => {
    e.preventDefault();
    setSubmissionDate("");
  };
  // -----------------------------------------------------------------------------------------------------------------
  return (
    <div name="shsh">
      <form
        method="GET"
        style={{ position: "relative" }}
        onSubmit={handelSubmit}
      >
        <div className={style.container}>
          <div className={style.box}>
            <label htmlFor="class">class</label>
            <select
              type="number"
              name="class"
              id="class"
              required
              value={getQueryData.cls}
              onChange={(e) =>
                setQueryData({ ...getQueryData, cls: e.target.value })
              }
            >
              <option value="" hidden>
                Select
              </option>
              {cls.map((element, i) => (
                <option key={i} className={style.opt} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          <div className={style.box}>
            <label htmlFor="year">year</label>
            <input
              type="number"
              value={getQueryData.year}
              placeholder="year"
              name="year"
              id="year"
              min="1900"
              max="2099"
              onChange={(e) =>
                setQueryData({ ...getQueryData, year: e.target.value })
              }
              required
            />
          </div>

          {/* months */}
          <div className={style.box}>
            <label htmlFor="monthName">Month </label>

            <select
              type="number"
              name="monthName"
              id="monthName"
              onChange={handleChangeOfSelect}
            >
              <option value="" hidden>
                Select
              </option>
              {monthArrayList.map((element, i) => (
                <option key={i} className={style.opt} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          {/* ended */}
          <div className={style.box}>
            <label htmlFor="search">Std Name</label>
            <input
              type="search"
              name="search"
              id="search"
              value={getQueryData.Name}
              placeholder="search_name"
              onChange={(e) =>
                setQueryData({ ...getQueryData, Name: e.target.value })
              }
            />
          </div>
          <div
            className={`${style.box} ${style.submitDiv} `}
            style={{ alignSelf: "center" }}
          >
            <input
              style={{ padding: "20px" }}
              className={style.submitBtn}
              type="submit"
              id="submit"
              value="submit"
              onClick={handleClickSubmit}
            />
          </div>
        </div>
      </form>
      {showDataFroUsr ? <DataCard resp={resDataForUsr} /> : null}

      <form method="GET" onSubmit={handleAdminBtnSubmit}>
        <div className={style.container}>
          <div className={style.box} style={{ display: "block" }}>
            <label htmlFor="submissionDate">View Collection by Date</label>
            <input
              type="Date"
              value={submissionDate}
              name="submissionDate"
              id="submissionDate"
              required
              onChange={(e) => setSubmissionDate(e.target.value)}
            />
          </div>
          <div>
            <button className={style.submitBtn} onClick={handleButtonClick}>
              fetch
            </button>
          </div>
        </div>
      </form>
      {showData ? <DataCard2 resp={resData[0]} /> : null}
    </div>
  );
};

export default Viewlog;
