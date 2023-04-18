import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEnterEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleEnterPassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            if(data.code == 200){
                sessionStorage.setItem("session", data.token)
                navigate("/private")
            }
            else {
                alert(data.msg)
            }
        })
    }

    return(
        <div className="container col-lg-6">
            <h1>Login</h1>
            <form className="mt-3" method="POST" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input type="email" className="form-control" id="username" placeholder="Enter your username" onInput={handleEnterEmail} required></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" onInput={handleEnterPassword} required></input>
                    </div>
                    <div className="mb-3">
                        <a href="/signup">Click here to create an account</a>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Click to login!</button>
                    </div>
            </form>
        </div>
    )
};

