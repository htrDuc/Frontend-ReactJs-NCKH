import React, {useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import InfoUser from "./InfoUser";
import RoundChart from "../components/RoundChart";
import "../scss/tableResult.scss";

const TableResult = ({ listUsers, updateListUsers }) => {
  const [nameCustomer, setNameCustomer] = useState("");
  const [newListUsers, setNewListUsers] = useState(listUsers);

  const deleteUser = (id) => {
    const listUsersUpdate = listUsers.filter((user) => id !== user.id);
    setNewListUsers(listUsersUpdate);

    updateListUsers(listUsersUpdate);
  };

  const handleSearch = () => {
    let newListUsers = listUsers.filter((user) => {
      return user.nameUser.toLowerCase().includes(nameCustomer.toLowerCase());
    });
    setNewListUsers(newListUsers);
  };

  const onKeyPress = (event) => {
    const { key } = event;
    if (key.toLowerCase() === "enter") {
      handleSearch();
    }
  };

  return (
    <div className="container-table table-result">
      <RoundChart listUsers={newListUsers} />
      <div className="table-result">
        <div className="header">
          <h2>Loan results table</h2>
        </div>

        <div className="search-box">
          <Input
            type="text"
            placeholder="Input customer"
            value={nameCustomer}
            onChange={(e) => {
              setNameCustomer(e.target.value);
            }}
            onKeyPress={(e) => onKeyPress(e)}
          />
          <Button color="#3498db" name="Submit" onClick={handleSearch} />
        </div>

        <div className="content">
          {!newListUsers.length ? (
            <h4
              style={{ textAlign: "center", paddingBottom: 50, color: "red" }}
            >
              This customer name does not exist, please re-enter!!!
            </h4>
          ) : (
            newListUsers.map((user) => (
              <InfoUser
                key={user.id}
                id={user.id}
                loan={user.loan}
                nameUser={user.nameUser}
                salary={user.salary}
                region={user.region}
                gender={user.gender}
                married={user.married}
                dependents={user.dependents}
                selfEmployed={user.selfEmployed}
                loanAmount={user.loanAmount}
                loanAmountTerm={user.loanAmountTerm}
                creditHistory={user.creditHistory}
                deleteUser={deleteUser}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TableResult;
