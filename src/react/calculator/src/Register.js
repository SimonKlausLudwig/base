import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";

import { v4 as uuid } from 'uuid';
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';


function Register() {

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
                <h1>Register</h1>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form >

        );
    }





}

export default App;
