import React, {useEffect, useState} from "react";
import "./scss/index.scss";
import FormInfoUser from "./features/FormInfoUser";
import TableResult from "./features/TableResult";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import images from "./assets/images";
import UploadForm from "./features/FileUpload";

const App = () => {
    const saveListUsers = JSON.parse(localStorage.getItem("listUsers"));
    const [listUsers, setListUsers] = useState(saveListUsers || []);

    const updateListUsers = (listUsers) => {
        setListUsers(listUsers);
    };

    useEffect(() => {
        localStorage.setItem("listUsers", JSON.stringify(listUsers));
    });

    return (
        <Router>
            <Navbar className="navbar" expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/users">
                    <img alt="logo" src={images.logo.default} width="80" height="80"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className="customStyle" id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/users">Loan results table</Nav.Link>
                        <NavDropdown title="Please choose a prediction method" id="basic-nav-dropdown">
                            Naive Bayes Classifer
                            <NavDropdown.Item
                                className="option"
                                href="/form/naive-bayes-classifer"
                            >
                                Input infomation
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                className="option"
                                href="/batchProcessing/naive-bayes-classifer"
                            >
                                Batch Processing
                            </NavDropdown.Item>
                            Decision Tree Classifer
                            <NavDropdown.Item
                                className="option"
                                href="/form/decision-tree-classifer"
                            >
                                Input infomation
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                className="option"
                                href="/batchProcessing/decision-tree-classifer"
                            >
                                Batch Processing
                            </NavDropdown.Item>
                            Random Forest Classifer
                            <NavDropdown.Item
                                className="option"
                                href="/form/random-forest-classifer"
                            >
                                Input infomation
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                className="option"
                                href="/batchProcessing/random-forest-classifer"
                            >
                                Batch Processing
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="App">
                <Switch>
                    <Route path="/form/:algorithm">
                        <FormInfoUser
                            listUsers={listUsers}
                            updateListUsers={updateListUsers}
                        />
                    </Route>
                    <Route path="/users">
                        <TableResult
                            listUsers={listUsers}
                            updateListUsers={updateListUsers}
                        />
                    </Route>
                    <Route path="/users">
                        <TableResult
                            listUsers={listUsers}
                            updateListUsers={updateListUsers}
                        />
                    </Route>
                    <Route path="/batchProcessing/:algorithm" component={UploadForm}>
                    </Route>
                </Switch>
            </div>

            <div className="footer-wrapper">
                <div className="footer m-top">
                    <div className="inline between">
                        <div className="inline contact">
                            <div
                                className="font-12"
                                style={{
                                    paddingRight: "10px",
                                    borderRight: "1px #cacaca solid",
                                }}
                            >
                                Sitemap
                            </div>
                            <div
                                className="font-12"
                                style={{
                                    paddingLeft: "10px",
                                }}
                            >
                                Contact
                            </div>
                        </div>
                        <div className="inline">
                            <div className="font-12 spacing-right2">
                                Connect with us
                            </div>
                            <div className="inline">
                                <i className="fab fa-facebook-square spacing-right"></i>
                                <i className="fab fa-instagram spacing-right"></i>
                                <i className="fab fa-youtube spacing-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="font-12 m-top">
                        Copyright © 2021 belongs to IT3 Bank. All rights reserved
                        profit.
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
