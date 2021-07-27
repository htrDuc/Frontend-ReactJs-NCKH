import React, {useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import {RegionDropdown,} from "react-country-region-selector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle,} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";

const FormInfoUser = ({listUsers, updateListUsers}) => {
    const [nameUser, setNameUser] = useState("");
    const [gender, setGender] = useState("Male");
    const [married, setMarried] = useState("No");
    const [dependents, setDependents] = useState("0");
    const [selfEmployed, setSelfEmployed] = useState("No")
    const [salary, setSalary] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanAmountTerm, setLoanAmountTerm] = useState("");
    const [country, setCountry] = useState("Vietnam");
    const [region, setRegion] = useState("");
    const [creditHistory, setCreditHistory] = useState("");

    const {algorithm} = useParams()
    const [isLoan, setLoan] = useState("");
    const [error, setError] = useState(false);
    const [score, setScore] = useState("1");
    let path = ""

    let infoUser = {
        id: 1 + Math.random(),
        loan: isLoan,
        nameUser,
        salary,
        region,
        gender,
        married,
        dependents, loanAmount, loanAmountTerm, selfEmployed, creditHistory
    };

    const option = {
        gender: [{value: "Male"}, {value: "Female"}],
        married: [{value: "Yes"}, {value: "No"}],
        selfEmployed: [{value: "Yes"}, {value: "No"}],
    };

    if (algorithm === "naive-bayes-classifer") path = "predictNaiveBayes"
    else if (algorithm === "random-forest-classifer") path = "predictRandomForest"
    else if (algorithm === "decision-tree-classifer") path = "predictDecisionTree"

    const notiHandleBtnSubmit = () => {
        setTimeout(() => {
            document.getElementById("modal-success").style.display = "none";
        }, 2000);
        document.getElementById("modal-success").style.display = "block";
    };

    const handleInputForm = async (event) => {
        event.preventDefault();
        const url = `http://localhost:8000/${path}`;
        const bodyData = JSON.stringify({
            "Gender": infoUser.gender,
            "Married": infoUser.married,
            "Dependents": infoUser.dependents,
            "Self_Employed": infoUser.selfEmployed,
            "Salary": infoUser.salary,
            "Loan_Amount": infoUser.loanAmount,
            "Loan_Amount_Term": infoUser.loanAmountTerm,
            "Credit_History": infoUser.creditHistory,
            "Region": infoUser.region,
        });
        const reqOpt = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: bodyData
        };
        const resp =await fetch(url, reqOpt)
        const resp2 = await resp.json()
            if(path === "predictRandomForest") setScore(resp2.score)
            else  {
                setLoan(resp2.predict.toString());
                console.log(isLoan)
            }
    }

    const handleClickBtnSubmit = (event) => {
        if ((
            !nameUser ||
            !salary ||
            !region ||
            !gender ||
            !married ||
            !dependents || !loanAmount || !loanAmountTerm || !selfEmployed || !creditHistory)
            && path !== "predictRandomForest"
        ) {
            notiHandleBtnSubmit();
            return setError(true);
        }
        handleInputForm(event);

        if(path !== "predictRandomForest"){
            setError(false);
            notiHandleBtnSubmit();
            const data = [...listUsers];
            data.push(infoUser);
            updateListUsers(data);
        } else {
            alert("Tỉ lệ dự đoán là: " + score*100 + "%")
        }
    };

    const renderTextNotiLoan = (isLoan, nameUser) => {
        return (
            <>
                {isLoan ==="Y" ? (
                    <>
                        <div className="p-right">
                            Congratulation <span style={{fontWeight: "bold"}}>{nameUser}</span>{" "}
                            has been borrowed
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-right">
                            Sorry <span style={{fontWeight: "bold"}}>{nameUser}</span>{" "}
                            Not qualified for a loan
                        </div>
                    </>
                )}
            </>
        );
    };

    return (
        <div className="container">
            <div
                id="modal-success"
                className={
                    error || isLoan === "N"
                        ? "modal-noti modal-fail"
                        : "modal-noti modal-success"
                }
                style={{display: "none"}}
            >
                {!error ? (
                    <span className="inline">
            {renderTextNotiLoan(isLoan, nameUser)}
                        <FontAwesomeIcon
                            className={isLoan === "Y" ? "check" : "cancel"}
                            icon={isLoan === "Y" ? faCheckCircle : faTimesCircle}
                        />
          </span>
                ) : (
                    <span className="inline">
            <div className="p-right">Please fill out the form</div>
            <FontAwesomeIcon className="cancel" icon={faTimesCircle}/>
          </span>
                )}
            </div>

            <div className="form-info-user">
                <div className="header">
                    <h2>Customer Information: using {algorithm}</h2>
                </div>
                <div className="content">
                    <div className="input-wrapper">
                        <div className="inner">
                            <div className="title-input">Full name</div>
                            <Input
                                type="text"
                                value={nameUser}
                                placeholder="Input full name"
                                onChange={(e) => setNameUser(e.target.value)}
                            />
                        </div>
                        <div className="inner">
                            <div className="title-input">Salary</div>
                            <Input
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <div className="inner">
                            <div className="title-input">Dependents</div>
                            <Input
                                type="number"
                                value={dependents}
                                onChange={(e) => setDependents(e.target.value)}
                            />
                        </div>
                        <div className="inner">
                            <div className="title-input">Region</div>
                            <RegionDropdown
                                country={country}
                                value={region}
                                onChange={setRegion}
                            />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <div className="inner">
                            <div className="title-input">Gender</div>
                            <Select
                                options={option.gender}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                        <div className="inner">
                            <div className="title-input">Married</div>
                            <Select
                                options={option.married}
                                value={married}
                                onChange={(e) => setMarried(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <div className="inner">
                            <div className="title-input">Loan Amount</div>
                            <Input
                                type="number"
                                placeholder="Input loan amount"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                            />
                        </div>
                        <div className="inner">
                            <div className="title-input">Loan Amount Term</div>
                            <Input
                                type="number"
                                placeholder="Input how many years is the loan amount term?"
                                value={loanAmountTerm}
                                onChange={(e) => setLoanAmountTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <div className="inner">
                            <div className="title-input">Self Employed</div>
                            <Select
                                options={option.selfEmployed}
                                value={selfEmployed}
                                onChange={(e) => setSelfEmployed(e.target.value)}
                            />
                        </div>
                        <div className="inner">
                            <div className="title-input">Credit History</div>
                            <Input
                                type="number"
                                placeholder="Input credit history"
                                value={creditHistory}
                                onChange={(e) => setCreditHistory(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Button
                        color="#3498db"
                        onClick={handleClickBtnSubmit}
                        name="Submit"
                    />
                </div>
                <div className="error-message">{error}</div>
            </div>
        </div>
    );
};

export default FormInfoUser;
