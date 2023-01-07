import * as React from 'react';
import { BrowserRouter, Routes, Route, Outlet, NavLink, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';


/// shopping list imports
import './ShoppingList.css';
import useFetch from "react-fetch-hook";

/// splitter imports
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Splitter.css';
import { v4 as uuid } from 'uuid';
import { appendErrors, useForm } from "react-hook-form";
//import useFetch from "react-fetch-hook";

/// overview imports
import './Overview.css';
//import useFetch from "react-fetch-hook";
import { Link } from 'react-router-dom';

/// login imports
//import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
///import { useForm } from "react-hook-form";
//import useFetch from "react-fetch-hook";
///import { Link, Routes, Route, useNavigate } from 'react-router-dom'

/// register imports
import Form from 'react-bootstrap/Form';
import './Register.css'



const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="shoppinglist" element={<ShoppingList />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="splitter" element={<Splitter />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

const Layout = () => {
    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: 'black',
        margin: '0 1rem',
        textDecoration: "none"

    });


    return (
        <>
            <div>
                <h1 id="title">Splitmate</h1>
            </div>

            <div>

                <Navbar bg="white" variant="light" className="justify-content-center" hidden={false}>
                    <NavLink to="/shoppinglist" style={style} textDecoration="none">
                        ShoppingList
                    </NavLink>
                    <NavLink to="/overview" style={style}>
                        Overview
                    </NavLink>
                    <NavLink to="/splitter" style={style}>
                        Splitter
                    </NavLink>
                </Navbar>
            </div>

            <main style={{ padding: '1rem 0' }}>
                <Outlet />
            </main>
        </>
    );
};




/// shopping list start ///
const ShoppingList = () => {
    const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/shoppingList");

    if (isLoading === false) {
        let shoppingListData = data.filter(shoppingListData => shoppingListData.groupID == sessionStorage.getItem('myGroupID'))
        console.log(Object.keys(data))
        console.log("test")
        return (
            <>
                <div id="wrapper">
                    <div id="shoppingListTable" className="App">

                        <Table striped bordered hover className="table mx-auto">
                            <thead>
                                <tr>
                                    <th class="col">Gegenstand</th>
                                    <th class="col">Menge</th>
                                    <th class="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {shoppingListData.map(item => (
                                    <tr>
                                        <td>{item.item}</td>
                                        <td>{item.amount}</td>
                                        <td><button class="w-100 btn btn-lg btn-primary" onClick={() => deleteEntry(item.shoppingListID)}>Löschen!</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>

                    <div id="addShoppingListEntry">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Gegenstand</span>
                            <input id="shoppingListItem" type="text" class="form-control"></input>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Menge</span>
                            <input id="itemAmount" type="text" class="form-control"></input>
                        </div>
                        <div>
                            <button class="w-100 btn btn-lg btn-primary" onClick={() => addEntry(document.getElementById("shoppingListItem").value, document.getElementById("itemAmount").value)}>Hinzufügen zur Einkaufsliste</button>
                        </div>
                    </div>

                </div>
            </>
        );
    };
}



function deleteEntry(shoppingListID) {
    fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/shoppingList/" + shoppingListID, {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE"
    })
        .then(function (res) { window.location.reload() })
        .catch(function (res) { console.log(res) })
}
function addEntry(shoppingListItem, itemAmount) {
    fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/shoppingList?" + "item=" + shoppingListItem + "&amount=" + itemAmount + "&shoppingListID=" + uuid() + "&groupID=" + sessionStorage.getItem('myGroupID'), {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT"
    })
        .then(function (res) { window.location.reload() })
        .catch(function (res) { console.log(res) })
}

/// shopping list end ///


/// overview start ///

const Overview = () => {
    const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills");


    if (isLoading === false) {
        let overviewData = data.filter(overviewData => overviewData.groupID == sessionStorage.getItem('myGroupID'))

        return (
            <div className="App col">

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Gläubiger</th>
                            <th>Schuldner</th>
                            <th>Datum</th>
                            <th>Betrag</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {overviewData.map(item => (
                            <tr>
                                <td>{item.contributorFirstname + " " + item.contributorLastname}</td>
                                <td>{item.sharedWith}</td>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td><button class="w-100 btn btn-lg btn-primary" onClick={() => deleteBill(item.billID)}>Löschen!</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        );
    }
}



function deleteBill(billID) {
    fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills/" + billID, {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE"
    })
        .then(function (res) { window.location.reload() })
        .catch(function (res) { console.log(res) })
}

/// overview end ///

/// splitter start ///

const Splitter = () => {
    const contributor = sessionStorage.getItem('myFirstname');
    const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/login");
    const { register, handleSubmit, formState: { errors } } = useForm();


    if (isLoading) {
        console.log("...loading")
        return <div>Is loading!</div>
    }

    let loginData = data;
    // filter loginData to specific groupID from user
    loginData = loginData.filter(loginData => loginData.groupID == sessionStorage.getItem('myGroupID'))

    //filter out yourself with your personID
    loginData = loginData.filter(loginData => loginData.personID != sessionStorage.getItem('myPersonID'))

    const onSubmit = splitterData => {
        let date = new Date();
        date = date.toISOString()
        date = date.substring(0, 10)


        let datasharedWith = splitterData.sharedWith

        if (!Array.isArray(datasharedWith)) {
            datasharedWith = [datasharedWith]
        }
        let amountPeople = datasharedWith.length + 1
        datasharedWith.forEach(element => {


            fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills?contributorFirstname=" + sessionStorage.getItem('myFirstname') + "&contributorLastname=" + sessionStorage.getItem('myLastname') + "&amount=" + (splitterData.amount / amountPeople) + "&sharedWith=" + element + "&comment=" + splitterData.comment + "&billID=" + uuid() + "&date=" + date + "&groupID=" + sessionStorage.getItem('myGroupID'), {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT"
            })
                .then(function (res) { window.location.reload() })
                .catch(function (res) { console.log(res) })
        });
    }

    return (

        <main class="form-signin w-100 m-auto">

            <form onSubmit={handleSubmit(onSubmit)}>

                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Betrag €</span>
                            <input {...register("amount")} type="text" class="form-control" aria-label="Amount (to the nearest dollar)"></input>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col checkbox mb-3">
                        {loginData.map(item => (
                            <div>
                                <input {...register("sharedWith")} type="checkbox" value={item.firstname + " " + item.lastname} />
                                <label for={item.firstname + " " + item.lastname}>{item.firstname + " " + item.lastname}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3" id="Kommentar">
                            <span class="input-group-text">Kommentar</span>
                            <textarea {...register("comment")} class="form-control" aria-label="Kommentar"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div>
                            <button id="create" class="w-100 btn btn-lg btn-primary" type="submit">
                                splitten
                            </button>
                        </div>
                    </div>
                </div>

            </form>

        </main >
    );
}

/// splitter end ///


/// login start ///

const Login = () => {
    const navigate = useNavigate();
    let { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/login");



    const onSubmit = formData => {

        console.log(formData)
        data.forEach(element => {
            if ((formData.username === element.eMail) && (formData.password === element.password)) {

                // set user specific variables and store them in session storage of browser
                sessionStorage.setItem('myFirstname', element.firstname);
                sessionStorage.setItem('myLastname', element.lastname);
                sessionStorage.setItem('myGroupID', element.groupID);
                sessionStorage.setItem('myPersonID', element.personID);

                // after successfull login navigate to overview page

                navigate("overview")

            }
        });
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input {...register("username")} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" className="form-control" id="password" />
            </div>

            <div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>

            <div>
                <NavLink to="/register">
                    or register here
                </NavLink>
            </div>

        </form>
    );
}

/// login end ///


/// register start /// 

const Register = () => {

    const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/login");
    const { register, handleSubmit, formState: { errors } } = useForm();
    if (isLoading === false) {
        console.log(data)
        let groupIDs = data.map(loginData => loginData.groupID);
        groupIDs = [...new Set(groupIDs)];

        const onSubmit = registerData => {
            console.log("registerData:", registerData)
            fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/login?" + "eMail=" + registerData.eMail + "&password=" + registerData.password + "&firstname=" + registerData.firstname + "&lastname=" + registerData.lastname + "&personID=" + uuid() + "&groupID=" + registerData.groupID, {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT"
            })
                .then(function (res) { window.location.reload() })
                .catch(function (res) { console.log(res) })
        }

        return (

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <h1>Register</h1>
                </div>

                <div className="form-group">
                    <label>Firstname</label>
                    <input {...register("firstname")} className="form-control" id="firstname" />
                </div>

                <div className="form-group">
                    <label >Lastname</label>
                    <input {...register("lastname")} className="form-control" id="lastname" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input {...register("eMail")} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input {...register("password")} type="password" className="form-control" id="password" />
                </div>

                <div>
                    <label >Suche dir deine Gruppe aus</label>
                    <Form.Select {...register("groupID")} aria-label="Default select example">
                        {groupIDs.map(groupID => (


                            <option value={groupID}>{groupID}</option>

                        ))}
                    </Form.Select>
                </div>

                <div id="register">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>

            </form >
        );
    }
}

export default App;