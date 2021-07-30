import React, { useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { RegionDropdown } from "react-country-region-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { fetchApiAnalyst } from "../api/form-loan";

const FormInfoUser = ({ listUsers, updateListUsers }) => {
  const [nameUser, setNameUser] = useState("");
  const [gender, setGender] = useState("Male");
  const [married, setMarried] = useState("No");
  const [dependents, setDependents] = useState("0");
  const [selfEmployed, setSelfEmployed] = useState("No");
  const [salary, setSalary] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanAmountTerm, setLoanAmountTerm] = useState("");
  const [country] = useState("Vietnam");
  const [region, setRegion] = useState("");
  const [creditHistory, setCreditHistory] = useState("");

  const { algorithm } = useParams();
  const [isLoan, setLoan] = useState("");
  const [error, setError] = useState(false);
  const [score, setScore] = useState("");
  const [predictRate, setPredictRate] = useState(false);
  let path = "";

  if (algorithm === "naive-bayes-classifer") path = "predictNaiveBayes";
  else if (algorithm === "random-forest-classifer")
    path = "predictRandomForest";
  else if (algorithm === "decision-tree-classifer")
    path = "predictDecisionTree";

  let infoUser = {
    id: 1 + Math.random(),
    loan: isLoan,
    nameUser,
    salary,
    region,
    gender,
    married,
    dependents,
    loanAmount,
    loanAmountTerm,
    selfEmployed,
    creditHistory,
  };

  const option = {
    gender: [{ value: "Male" }, { value: "Female" }],
    married: [{ value: "Yes" }, { value: "No" }],
    selfEmployed: [{ value: "Yes" }, { value: "No" }],
  };

  const notiHandleBtnSubmit = () => {
    setTimeout(() => {
      document.getElementById("modal-success").style.display = "none";
    }, 2000);
    setTimeout(() => {
      document.getElementById("modal-success").style.display = "block";
    }, 1000);
  };

  const notiPredictRate = () => {
    document.getElementById("modal-rate-success").style.display = "block";
    setTimeout(() => {
      document.getElementById("modal-rate-success").style.display = "none";
    }, 2000);
  };

  const handleInputForm = async (event) => {
    event.preventDefault();
    try {
      const data = {
        Gender: infoUser.gender,
        Married: infoUser.married,
        Dependents: infoUser.dependents,
        Self_Employed: infoUser.selfEmployed,
        Salary: infoUser.salary,
        Loan_Amount: infoUser.loanAmount,
        Loan_Amount_Term: infoUser.loanAmountTerm,
        Credit_History: infoUser.creditHistory,
        Region: infoUser.region,
      };
      const res = await fetchApiAnalyst(path, data);
      if (path === "predictRandomForest") {
        setScore(res.score);
      } else {
        return res.predict[0];
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickBtnSubmit = async (event) => {
    if (
      (!nameUser ||
        !salary ||
        !region ||
        !gender ||
        !married ||
        !dependents ||
        !loanAmount ||
        !loanAmountTerm ||
        !selfEmployed ||
        !creditHistory) &&
      path !== "predictRandomForest"
    ) {
      notiHandleBtnSubmit();
      return setError(true);
    }
    const resultCalculateRate = await handleInputForm(event);
    setLoan(resultCalculateRate);
    const newInfoUser = {
      id: 1 + Math.random(),
      loan: resultCalculateRate,
      nameUser,
      salary,
      region,
      gender,
      married,
      dependents,
      loanAmount,
      loanAmountTerm,
      selfEmployed,
      creditHistory,
    };

    if (path !== "predictRandomForest") {
      setError(false);
      notiHandleBtnSubmit();
      const data = [...listUsers];
      data.push(newInfoUser);
      updateListUsers(data);
    } else {
      // alert()
      setPredictRate(true);
      notiPredictRate();
      console.log("Tỉ lệ dự đoán là: " + score * 100 + "%", predictRate);
    }
  };

  const renderTextNotiLoan = (textCondition, result) => {
    if (!textCondition) return;

    if (textCondition === "score") {
      console.log(result);
      return (
        <>
          {" "}
          {Number(result) >= 50 && (
            <div className="p-right">
              The predicted rate is:{" "}
              <span style={{ fontWeight: "bold" }}> {result} </span>{" "}
            </div>
          )}{" "}
          {Number(result) < 50 && (
            <div className="p-right">
              The predicted rate is:{" "}
              <span style={{ fontWeight: "bold" }}> {result} </span>{" "}
            </div>
          )}{" "}
        </>
      );
    }

    return (
      <>
        {textCondition === "Y" ? (
          <div className="p-right">
            Congratulation{" "}
            <span style={{ fontWeight: "bold" }}> {result} </span> has been
            borrowed{" "}
          </div>
        ) : (
          <div className="p-right">
            Sorry <span style={{ fontWeight: "bold" }}> {result} </span> not
            qualified for a loan{" "}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container">
      <div
        id="modal-rate-success"
        className="modal-noti modal-success"
        style={{ display: "none" }}
      >
        {" "}
        {predictRate === true && (
          <span className="inline">
            {" "}
            {renderTextNotiLoan("score", score * 100)}{" "}
          </span>
        )}{" "}
      </div>{" "}
      <div
        id="modal-success"
        className={
          error || isLoan === "N"
            ? "modal-noti modal-fail"
            : "modal-noti modal-success"
        }
        style={{ display: "none" }}
      >
        {" "}
        {!error ? (
          <span className="inline">
            {" "}
            {renderTextNotiLoan(isLoan, nameUser)}{" "}
            <FontAwesomeIcon
              className={isLoan === "Y" ? "check" : "cancel"}
              icon={isLoan === "Y" ? faCheckCircle : faTimesCircle}
            />{" "}
          </span>
        ) : (
          <span className="inline">
            <div className="p-right"> Please fill out the form </div>{" "}
            <FontAwesomeIcon className="cancel" icon={faTimesCircle} />{" "}
          </span>
        )}{" "}
      </div>{" "}
      <div className="form-info-user">
        <div className="header">
          <h2> Customer Information: using {algorithm} </h2>{" "}
        </div>{" "}
        <div className="content">
          <div className="input-wrapper">
            <div className="inner">
              <div className="title-input"> Full name </div>{" "}
              <Input
                type="text"
                value={nameUser}
                placeholder="Input full name"
                onChange={(e) => setNameUser(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="inner">
              <div className="title-input"> Salary </div>{" "}
              <Input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="input-wrapper">
            <div className="inner">
              <div className="title-input"> Dependents </div>{" "}
              <Input
                type="number"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="inner">
              <div className="title-input"> Region </div>{" "}
              <RegionDropdown
                country={country}
                value={region}
                onChange={setRegion}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="input-wrapper">
            <div className="inner">
              <div className="title-input"> Gender </div>{" "}
              <Select
                options={option.gender}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="inner">
              <div className="title-input"> Married </div>{" "}
              <Select
                options={option.married}
                value={married}
                onChange={(e) => setMarried(e.target.value)}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="input-wrapper">
            <div className="inner">
              <div className="title-input"> Loan Amount </div>{" "}
              <Input
                type="number"
                placeholder="Input loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="inner">
              <div className="title-input"> Loan Amount Term </div>{" "}
              <Input
                type="number"
                placeholder="Input how many years is the loan amount term?"
                value={loanAmountTerm}
                onChange={(e) => setLoanAmountTerm(e.target.value)}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="input-wrapper">
            <div className="inner">
              <div className="title-input"> Self Employed </div>{" "}
              <Select
                options={option.selfEmployed}
                value={selfEmployed}
                onChange={(e) => setSelfEmployed(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="inner">
              <div className="title-input"> Credit History </div>{" "}
              <Input
                type="number"
                placeholder="Input credit history"
                value={creditHistory}
                onChange={(e) => setCreditHistory(e.target.value)}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="footer">
          <Button
            color="#3498db"
            onClick={handleClickBtnSubmit}
            name="Submit"
          />
        </div>{" "}
        <div className="error-message"> {error} </div>{" "}
      </div>{" "}
    </div>
  );
};

export default FormInfoUser;
