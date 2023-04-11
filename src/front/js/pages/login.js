import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => { 
    const resp = await fetch(`https://3001-sandrafepu-authenticati-9nbll8hr6dv.ws-eu93.gitpod.io/api/token`, { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }) 
      })
      console.log(resp)
      /*if(!resp.ok) alert("There was a problem in the login request")*/
      
      if(resp.status === 401){
          alert("Invalid credentials")
      }
      else if(resp.status === 400){
          alert("Invalid email or password format")
      }
      const data = resp.json()
      // save your token in the localStorage
    //also you should set your user into the store using the setStore function
    console.log(data.token)
      localStorage.setItem("jwt-token", data.token);

      alert("login correcto")
    }


	return (
		<div className="container">
			  <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email}
          onChange={(ev) => setEmail(ev.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleClick}>
        Login
      </Button>
      <Link className="link-register" to="/register">
        Si no tienes cuenta, regístrate AQUÍ
      </Link>
    </Form>
			
		</div>
	);
};

