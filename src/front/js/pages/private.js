import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	// retrieve token form localStorage
	const token = sessionStorage.getItem('session');

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
		}
		else {
			navigate("/login")
		}
	})

	return (
		<div className="text-center mt-5">
			<h1>Hello {email}!</h1>
			<h2>I'm private component</h2>
		</div>
	);
};
