import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const [email, setEmail] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const navigate = useNavigate();
	// retrieve token form localStorage
	const token = sessionStorage.getItem('session');

	const handleLogOut = () => {
		sessionStorage.removeItem('session');
		navigate("/")
	}

	fetch(process.env.BACKEND_URL + "/api/private", {
		method: "GET",
		headers: {
			"Content-Type" : "application/json",
			"Authorization": "Bearer " + token
		}
	})
	.then(res => res.json())
	.then(data => {
		//console.log(data)
		if(data.code == 200){
			setEmail(data.email)
			setLoggedIn(true)
		}
		else {
			navigate("/login")
		}
	})

	if(!loggedIn) {
		return null;
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello {email}!</h1>
			<h2>I'm private component</h2>
			<button className="btn btn-danger" onClick={handleLogOut}>Cerrar sesión</button>
		</div>
	);
};
