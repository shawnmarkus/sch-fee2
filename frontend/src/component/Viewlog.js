import React, { useEffect, useState } from "react";
import DataCard from "./DataCard";
import style from "../css/View.module.css";
import $ from "jquery";
import { cls, monthArrayList } from "./data";

const Viewlog = () => {
  const [resData, setResData] = useState([]);

  // to show the data
  const [showData, setShowData] = useState(false);

  // its to get the query data
  const [getQueryData, setQueryData] = useState({
    Name: "",
    year: "",
    cls: "",
    monthName: "",
  });

  const [clsFees, setClsFees] = useState("");

  useEffect(() => {
    if (resData.length) {
      setShowData(true);
    } else {
      setShowData(false);
    }
  }, [resData]);

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

    // making request
    const res = await fetch(url, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // converting to json so as to be parsed
    const receivedData = await res.json();
    setResData(receivedData.obj);
  };

  const handleChangeOfSelect = (e) => {
    setQueryData({ ...getQueryData, monthName: e.target.value });
    console.log("view log", e.target.value);
  };

  const handeSubmit = (e) => {
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

    setResData([]);
  };

  return (
    <>
      <form method="GET" onSubmit={handeSubmit}>
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
        </div>

        <div className={style.submitDiv}>
          <input
            className={style.submitBtn}
            type="submit"
            value="submit"
            onClick={handleClickSubmit}
          />
        </div>
      </form>

      {showData ? <DataCard resp={resData} clsFees={clsFees} /> : null}
    </>
  );
};

export default Viewlog;
