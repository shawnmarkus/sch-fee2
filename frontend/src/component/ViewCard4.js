// for testing only
import React, { useEffect, useState } from "react";
import style from "../css/ViewDataCard1.module.css";
import axios from "axios";
import { useNavigate as useHistory } from "react-router-dom";
import { monthArrayList, feesMap } from "./data";

const ViewDataCard = ({ resp, resp2 }) => {
  const Navigate = useHistory();
  const [dataToSend, setDataToSend] = useState({
    monthsData: new Set(),
    feesSubmit: 0,
    setDiscount: 0,
    setDateOfSubmission: Date(),
  });

  useEffect(() => {
    // console.log(
    //   "your admin intance is " +
    //     resp2.submissionDate.split("T")[0] +
    //     "responce data" +
    //     resp
    // );
    resp.months.map((item) => dataToSend["monthsData"].add(item));
  }, []);

  const handleOnClickSubmit = async (e) => {
    const res = await axios
      .patch("/userEntry", {
        _id: resp._id,
        months: [...dataToSend["monthsData"]],
        fees: eval(parseInt(dataToSend["feesSubmit"]) + parseInt(resp.fees)),
        Discount: parseInt(resp.Discount) + parseInt(dataToSend["setDiscount"]),
      })
      .then((item) => {
        alert("data updated");
        Navigate(0); //navigate to same page
      })
      .catch((err) => console.log(err));

    const res2 = await axios.patch("/adminView", {
      _id: resp2._id,
      Amount: dataToSend["feesSubmit"],
      Discount: dataToSend["setDiscount"],
      submissionDate: resp2.submissionDate.split("T")[0],
      cls: resp.cls,
      rollNo: `${resp.rollNo}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataToSend({
      feesSubmit: 0,
      monthsData: [],
      setDiscount: 0,
      setDateOfSubmission: "",
    });
  };

  return (
    <div className={style.main}>
      <form
        className={style.innerMainBox}
        onSubmit={handleSubmit}
        method="PATCH"
      >
        <div className={style.title}>Submit Fees</div>
        <div className={style.schoolRelDt}>
          <div>
            <label htmlFor="Name">Name</label>
            <input
              className={style.inputBox}
              type="text"
              name="Name"
              id="Name"
              value={resp.Name}
              disabled
            />
          </div>
          <div>
            <label htmlFor="rollNo">Roll No:</label>{" "}
            <input
              className={style.inputBox}
              type="number"
              name="rollNo"
              id="rollNo"
              disabled
              value={resp.rollNo}
            />
          </div>
          <div>
            <label htmlFor="cls">Class</label>{" "}
            <input
              className={style.inputBox}
              type="text"
              name="cls"
              id="cls"
              disabled
              size="4"
              value={resp.cls}
            />
          </div>
          <div>
            <label htmlFor="year">Year</label>
            <input
              className={style.inputBox}
              type="number"
              name="year"
              id="year"
              disabled
              value={resp.year}
            />
          </div>
        </div>
        <div className={style.personalInfo}>
          <div>
            <label htmlFor="FatherName">FatherName</label>{" "}
            <input
              className={style.inputBox}
              type="text"
              name="FatherName"
              id="FatherName"
              disabled
              value={resp.fatherName}
            />
          </div>
          <div>
            <label htmlFor="MotherName">MotherName</label>{" "}
            <input
              className={style.inputBox}
              type="text"
              name="MotheraName"
              id="MotheraName"
              disabled
              value={resp.motherName}
            />
          </div>
        </div>
        <div className={style.feeDetail}>
          <div>
            <label htmlFor="dues">Prev Dues</label>{" "}
            <input
              className={style.inputBox}
              type="text"
              name="dues"
              id="dues"
              disabled
              value={
                feesMap[resp.cls] * resp.months.length -
                (resp.fees + resp.Discount)
              }
              // value={resp.fees}
            />
          </div>

          <div>
            <label htmlFor="feesSubmit">Submit Fees</label>{" "}
            <input
              className={style.inputBox}
              type="number"
              name="feesSubmit"
              id="feesSubmit"
              required
              value={dataToSend.feesSubmit}
              onChange={(e) => {
                setDataToSend({
                  ...dataToSend,
                  feesSubmit: e.target.value,
                });
              }}
            />
          </div>

          {/* for the Date of the submission */}
          <div>
            <label htmlFor="Submission_Date"> Fees Submission Date</label>{" "}
            <input
              className={style.inputBox}
              type="date"
              name="Submission_Date"
              id="Submission_Date"
              required
              disabled
              value={dataToSend.setDateOfSubmission}
              // onChange={(e) => {
              //   setDataToSend({
              //     ...dataToSend,
              //     setDateOfSubmission: e.target.value,
              //   });
              // }}
            />
          </div>
          <div>
            <label htmlFor="Discount">Discount</label>{" "}
            <input
              className={style.inputBox}
              type="number"
              name="Discount"
              id="Discount"
              required
              value={dataToSend.setDiscount}
              onChange={(e) => {
                setDataToSend({
                  ...dataToSend,
                  setDiscount: e.target.value,
                });
              }}
            />
          </div>

          {/* end */}
        </div>
        <div className={style.monthsToupdate}>Months</div>
        <div className={style.listMonth}>
          {Array.from(
            monthArrayList.map((element, i) => {
              if (resp.months.indexOf(element) !== -1) {
                return (
                  <div key={i}>
                    <input
                      type="checkbox"
                      name={element}
                      id={element}
                      checked
                      disabled
                      value={element}
                    />
                    <label htmlFor={element}>{element}</label>
                  </div>
                );
              } else {
                return (
                  <div key={i}>
                    <input
                      type="checkbox"
                      name={element}
                      id={element}
                      value={element}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDataToSend({
                            ...dataToSend,
                            monthsData: [
                              ...dataToSend["monthsData"],
                              e.target.value,
                            ],
                          });
                        } else {
                          // console.log(e.target.value);
                          let { value } = e.target;
                          // monthsdata.delete(e.target.value);
                          setDataToSend({
                            ...dataToSend,
                            monthsData: dataToSend["monthsData"].filter((e) => {
                              return e !== value;
                            }),
                          });
                        }
                      }}
                    />
                    <label htmlFor={element}>{element}</label>
                  </div>
                );
              }
            })
          )}
        </div>
        <input
          className={style.submitBtn}
          type="submit"
          onClick={handleOnClickSubmit}
        />
      </form>
    </div>
  );
};

export default ViewDataCard;
