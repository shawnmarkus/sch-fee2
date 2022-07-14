import React, { useState, useEffect } from "react";
import style from "../css/Update.module.css";

import ViewCard4 from "./ViewCard4";
import { cls } from "./data";
import axios from "axios";

const UpdateEntry = () => {
  const [getQueryData, setQueryData] = useState({
    rollNo: "",
    year: "",
    cls: "",
    // queryDate: "",
  });

  // to take data
  const [resData, setResData] = useState([]);
  const [resData2, setResData2] = useState([]);

  // to show the data
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (!resData.length) {
      setShowData(false);
      return;
    }
    setShowData(true);

    // <DataCard response={resData} />;
  }, [resData]);

  const handleClickSubmit = async (e) => {
    // to get data
    const { rollNo, year, cls } = getQueryData;

    const url = `/userEntry/?year=${year}&cls=${cls}&rollNo=${rollNo}`;

    //night update
    if (window.localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("token");
    }
    //night update end

    const res = await fetch(url, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (dataRcvd) => {
        if (dataRcvd.obj.length) {
          console.log(dataRcvd.obj);
          let submissionDate = new Date().toISOString().split("T")[0];

          const url2 = `/adminView/?submissionDate=${submissionDate}`;

          await axios
            .patch("/adminView", {
              id: null,
              submissionDate,
            })
            .then((response) => {
              console.log(response.data.obj);
              //to set the response of admin 2
            })
            .then(async (response) => {
              const res2 = await axios.get(url2);
              setResData(dataRcvd.obj); //to set the response of student
              setResData2(res2.data.obj);
            })
            .catch((error) => console.log("thrown error" + error));
        } else {
          alert("No Records");
        }
      })
      .catch((error) => alert(error));
  };

  const handeSubmit = (e) => {
    e.preventDefault();

    setQueryData({
      rollNo: "",
      year: "",
      cls: "",
    });
  };
  return (
    <div className={style.masterClassUpdate}>
      <form onSubmit={handeSubmit} method="GET">
        <div className={style.containerUpdate}>
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

          <div className={style.box}>
            <label htmlFor="year">Roll No:</label>
            <input
              type="number"
              name="Roll Number"
              id="Roll Number"
              required
              value={getQueryData.rollNo}
              placeholder="enter"
              onChange={(e) =>
                setQueryData({ ...getQueryData, rollNo: e.target.value })
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
      {/* {console.log(resData, resData2)} */}
      {showData ? <ViewCard4 resp={resData[0]} resp2={resData2[0]} /> : null}
    </div>
  );
};

export default UpdateEntry;
