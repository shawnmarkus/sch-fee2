import React, { useState } from "react";
import style from "../css/EntryForm.module.css";
import $ from "jquery";
import axios from "axios";
import { cls, monthArrayList } from "./data";

const EntryForm = () => {
  const [rawData, setRawData] = useState({
    Name: "",
    fatherName: "",
    motherName: "",
    rollNo: "",
    year: "",
    cls: "",
    fees: "0",
    Amount: "0",
    submissionDate: "",
    Discount: "0",
    months: new Set(),
  });

  //  for submit key and trigger the function
  const handleSubmit = (e) => {
    e.preventDefault();

    // correcting the entry of months
    // $("input[type='checkbox']:checked").map(function (i, key) {
    //   setRawData({ ...rawData, months: { ...rawData.months, key } });
    // });

    setRawData({
      Name: "",
      fatherName: "",
      motherName: "",
      rollNo: "",
      year: "",
      fees: "0",
      Amount: "0",
      Discount: "0",
      submissionDate: "",
      cls: undefined,
      months: new Set(),
    });

    // let li = $("input[type='checkbox']");
    // for (let i = 0; i < 12; i++) {
    //   li[i].checked = false;
    // }
    $("input[type='checkbox']:checked").map(function (i, key) {
      console.log(key.checked);
      key.checked = false;
    });
    // console.log(li);
    // $("input[type='checkbox']").removeAttr("checked");
    $("select").val("");
    // console.log(rawData);
  };

  const handleClickSubmit = async (e) => {
    const {
      Name,
      fatherName,
      motherName,
      rollNo,
      year,
      cls,
      months,
      fees,
      Discount,
      // submissionDate,
    } = rawData;

    // console.log(Name, fatherName, motherName, rollNo, year, cls, months);

    // const res = await fetch("/newentry", (req, res) => {

    // });

    // const res = await fetch("/newentry", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     Name,
    //     fatherName,
    //     motherName,
    //     rollNo,
    //     year,
    //     cls,
    //     fees,
    //     // feeSubmissionDate: {
    //     //   Amount,
    //     //   Discount,
    //     //   submissionDate: new Date().toISOString().split("T")[0],
    //     // },
    //     months: [...months],
    //   }),
    // });

    const res = await axios
      .post("/newentry", {
        Name,
        fatherName,
        motherName,
        rollNo,
        year,
        cls,
        fees,
        months: [...months],
        Discount,
      })
      .then(async (res) => {
        console.log(res.data.msg, res.data.obj);
        alert("data updated");
        const res2 = await axios
          .patch("/adminView", {
            Amount: fees,
            Discount,
            submissionDate: new Date().toISOString().split("T")[0],
            cls,
            rollNo,
          })
          .then((res) => console.log("Admin Data Success code" + res.data))
          .catch((error) => console.log("error from " + error));
      })
      .catch((error) => {
        console.log("entry will not be made in Admin Table becoz" + error);
      });

    // const response = await res.json();
    // const dataRecieved = res.data;
    // console.log("------------------>>" + dataRecieved.msg);
    // if (res) {
    //   console.log("------------------>>" + res.status, res.body);
    // }

    // const res2 = await axios.post("/adminView", {
    //   feeSubmissionDate: {
    //     Amount,
    //     Discount,
    //     submissionDate: new Date().toISOString().split("T")[0],
    //   },
    // });

    // const res2 = await axios
    //   .patch("/adminView", {
    //     Amount:fees,
    //     Discount,
    //     submissionDate,
    //     cls,
    //     rollNo,
    //   })
    //   .then((item) => {
    //     alert("data updated");
    //   })
    //   .catch((err) => console.log(err));

    // console.log(res, res2);
    console.log(rawData);
  };

  const handleChangeOfSelect = function (e) {
    setRawData({ ...rawData, cls: e.target.value });
    console.log(e.target.value);
  };

  // return
  return (
    <div className={style.mainBox}>
      <section className={style.topBox}>
        <div className={style.title}>Create an Entry</div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className={style.fieldBox}>
            <input
              className={style.inputBox}
              type="text"
              name="Name"
              id="Name"
              required
              autoComplete="off"
              value={rawData.Name}
              onChange={(e) => {
                setRawData({ ...rawData, Name: e.target.value }); //check for the spread operator , i think we can remove it because at once we have to take the only one value
              }}
            />
            <label htmlFor="Name">Name</label>
          </div>
          <div className={style.fieldBox}>
            <input
              className={style.inputBox}
              type="text"
              name="FatherName"
              id="FatherName"
              required
              autoComplete="off"
              value={rawData.fatherName}
              onChange={(e) => {
                setRawData({ ...rawData, fatherName: e.target.value }); //check for the spread operator , i think we can remove it because at once we have to take the only one value
              }}
            />
            <label htmlFor="FatherName">FatherName</label>
          </div>
          <div className={style.fieldBox}>
            <input
              className={style.inputBox}
              type="text"
              name="MotherName"
              id="MotherName"
              required
              autoComplete="off"
              value={rawData.motherName}
              onChange={(e) => {
                setRawData({ ...rawData, motherName: e.target.value }); //check for the spread operator , i think we can remove it because at once we have to take the only one value
              }}
            />
            <label htmlFor="MotherName">MotherName</label>
          </div>

          {/* for feesbmissionDate */}

          {/* ends here */}

          <div className={style.fieldBox}>
            <fieldset>
              <legend>Entry</legend>

              <div className={style.e}>
                <div className={style.entryData} style={{ display: "flex " }}>
                  <label htmlFor="class">class</label>
                  <select
                    type="number"
                    name="class"
                    id="class"
                    required
                    // value={rawData.class}
                    onChange={handleChangeOfSelect}
                    // defaultValue={"DEFAULT"}
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

                <div className={style.entryData}>
                  <label htmlFor="Year">Year</label>
                  <input
                    type="number"
                    min="1900"
                    max="2099"
                    name="Year"
                    id="Year"
                    required
                    value={rawData.year}
                    onChange={(e) => {
                      setRawData({ ...rawData, year: e.target.value }); //check for the spread operator , i think we can remove it because at once we have to take the only one value
                    }}
                  />
                </div>

                <div className={style.entryData}>
                  <label htmlFor="RollNo">RollNo</label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    name="RollNo"
                    id="RollNo"
                    required
                    value={rawData.rollNo}
                    onChange={(e) => {
                      setRawData({ ...rawData, rollNo: e.target.value }); //check for the spread operator , i think we can remove it because at once we have to take the only one value
                    }}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Months</legend>
              <div className={style.e}>
                {monthArrayList.map((element, i) => (
                  // console.log(element);
                  <div key={i}>
                    <input
                      type="checkbox"
                      name={element}
                      id={element}
                      value={element}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRawData({
                            ...rawData,
                            months: rawData["months"].add(e.target.value),
                          });
                        } else {
                          rawData.months.delete(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor={element}>{element}</label>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* feild for fees submission */}
            <fieldset
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <legend>Fee Submitted</legend>
              <div className={style.e}>
                <label htmlFor="Fees">Amt Submit: </label>
                <input
                  type="number"
                  min="0"
                  name="Fees"
                  id="Fees"
                  required
                  value={rawData.fees}
                  onChange={(e) => {
                    setRawData({ ...rawData, fees: e.target.value }); //check for the spread operator , i think we can remove it because at once we have to take the only one value
                  }}
                />
              </div>

              <div className={style.e}>
                <label htmlFor="Discount">Discount</label>
                <input
                  // className={style.inputBox}
                  type="number"
                  name="Discount"
                  id="Discount"
                  min="0"
                  required
                  // defaultValue="0"
                  value={rawData.Discount}
                  onChange={(e) => {
                    setRawData({
                      ...rawData,
                      Discount: e.target.value,
                    }); //check for the spread operator , i think we can remove it because at once we have to take the only one value
                  }}
                />
              </div>
            </fieldset>

            <input
              className={style.submitBtn}
              onClick={handleClickSubmit}
              // onClick={() => alert("onClick event")}
              type="submit"
            />
          </div>
        </form>
      </section>
    </div>
  );
};
export default EntryForm;
