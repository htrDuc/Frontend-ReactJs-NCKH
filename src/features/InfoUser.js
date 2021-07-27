import React, {useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle,} from "@fortawesome/free-solid-svg-icons";

const InfoUser = ({
                      id,
                      loan,
                      nameUser,
                      salary,
                      region,
                      gender,
                      married,
                      dependents,
                      selfEmployed,
                      loanAmount,
                      loanAmountTerm,
                      creditHistory,
                      deleteUser
                  }) => {
    const [isOpenDetail, setIsOpenDetail] = useState(true);

    const style = {
        height: "100%",
        marginBottom: "50px",
    };

    const handleBtnDeleteUser = (id) => {
        deleteUser(id);
    };

    return (
        <div style={style}>
            <div className="input-wrapper">
                <div className="loan">
                    <div className="info">
                        <div className="name-user">{nameUser}</div>
                        <FontAwesomeIcon
                            className={loan ? "check" : "cancel"}
                            icon={loan ? faCheckCircle : faTimesCircle}
                        />
                    </div>
                    <div className="input-wrapper">
                        <div className="inner">
                            <Button
                                color="#e74c3c"
                                name="Delete"
                                onClick={() => handleBtnDeleteUser(id)}
                            />
                            <Button
                                color="#3498db"
                                name="Detail"
                                onClick={() => setIsOpenDetail(!isOpenDetail)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={isOpenDetail ? "collapse" : "collapse-in"}>
                <div className="container-form-detail">
                    <div className="form-info-user">
                        <div className="header">
                            <h2>Customer information</h2>
                        </div>
                        <div className="content">
                            <div className="input-wrapper">
                                <div className="inner">
                                    <div className="title-input">Full name</div>
                                    <Input value={nameUser} disabled="disabled"/>
                                </div>
                                <div className="inner">
                                    <div className="title-input">Salary</div>
                                    <Input value={salary} disabled="disabled"/>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="inner">
                                    <div className="title-input">Dependents</div>
                                    <Input value={dependents} disabled="disabled"/>
                                </div>
                                <div className="inner">
                                    <div className="title-input">Tỉnh / Thành phố</div>
                                    <Input value={region} disabled="disabled"/>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="inner">
                                    <div className="title-input">Giới tính</div>
                                    <Input value={gender} disabled="disabled"/>
                                </div>
                                <div className="inner">
                                    <div className="title-input">Kết hôn</div>
                                    <Input value={married} disabled="disabled"/>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="inner">
                                    <div className="title-input">Loan Amount</div>
                                    <Input value={loanAmount} disabled="disabled"/>
                                </div>
                                <div className="inner">
                                    <div className="title-input">Loan Amount Term</div>
                                    <Input value={loanAmountTerm} disabled="disabled"/>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="inner">
                                    <div className="title-input">Self Employed</div>
                                    <Input value={selfEmployed} disabled="disabled"/>
                                </div>
                                <div className="inner">
                                    <div className="title-input">Credit History</div>
                                    <Input value={creditHistory} disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoUser;
