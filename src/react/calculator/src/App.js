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
//import 'bootstrap/dist/css/bootstrap.min.css';
///import { useForm } from "react-hook-form";
//import useFetch from "react-fetch-hook";
///import { Link, Routes, Route, useNavigate } from 'react-router-dom'





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
        margin: '0 1rem'
    });


    return (
        <>
            <h1>Splitmate</h1>

            <Navbar bg="light" variant="light" className="justify-content-center" hidden={false}>


                <NavLink to="/shoppinglist" style={style}>
                    ShoppingList
                </NavLink>
                <NavLink to="/overview" style={style}>
                    Overview
                </NavLink>
                <NavLink to="/splitter" style={style}>
                    Splitter
                </NavLink>


            </Navbar>

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
                                {data.map(item => (
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
    fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/shoppingList?contributor=" + contributor + "&item=" + shoppingListItem + "&amount=" + itemAmount + "&shoppingListID=" + uuid(), {

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
        console.log(Object.keys(data))
        console.log()

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
                        {data.map(item => (
                            <tr>
                                <td>{item.contributor}</td>
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

/*
function divider(sharedWith) {
    if (typeof (sharedWith == "String")) {
        return 2
    }
    else return sharedWith.length + 1
}
*/

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
    const { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills");
    const { register, handleSubmit, formState: { errors } } = useForm();


    if (isLoading) {
        console.log("...loading")
        return <div>Is loading!</div>
    }

    const bills = data;


    const onSubmit = data => {
        let date = new Date();
        date = date.toISOString()
        date = date.substring(0, 10)


        let datasharedWith = data.sharedWith
        let amountPeople = datasharedWith.length + 1
        datasharedWith.forEach(element => {


            fetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/bills?contributor=" + contributor + "&amount=" + parseInt((data.amount / amountPeople)) + "&sharedWith=" + element + "&comment=" + data.comment + "&billID=" + uuid() + "&date=" + date, {

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

    const options = [
        { value: 'Luca', label: 'Luca' },
        { value: 'Niklas', label: 'Niklas' },
        { value: 'Simon', label: 'Simon' }
    ]










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
                    <div class="col checkbox">
                        <div>
                            <input {...register("sharedWith")} type="checkbox" id="option1" value="Niklas" />
                            <label for="option1">Niklas</label>
                        </div>
                        <div>
                            <input {...register("sharedWith")} type="checkbox" id="option2" value="Luca" />
                            <label for="option2">Luca</label>
                        </div>
                        <div>
                            <input {...register("sharedWith")} type="checkbox" id="option3" value="Tim" />
                            <label for="option3">Tim</label>
                        </div>
                        <div>
                            <input {...register("sharedWith")} type="checkbox" id="option4" value="Tom" />
                            <label for="option4">Tom</label>
                        </div>




                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group " id="Kommentar">
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
                console.log("perfekt")
                sessionStorage.setItem('myFirstname', element.firstname);
                console.log(sessionStorage.getItem('myFirstname'))
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    );
}

/// login end ///
export default App;