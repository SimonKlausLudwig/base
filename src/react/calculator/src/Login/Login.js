import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";
import { Link, Routes, Route, useNavigate } from 'react-router-dom'



function Login() {

    let { isLoading, data } = useFetch("https://8080-nklsdhbw-webprogramming-ltpyo05qis6.ws-eu81.gitpod.io/api/login");

    const onSubmit = formData => {
        
        console.log(formData)
        data.forEach(element => {
            if ((formData.username === element.username) && (formData.password === element.password)) {
                console.log("perfekt")

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

export default Login;
