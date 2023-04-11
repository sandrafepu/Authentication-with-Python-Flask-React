import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';

export const Register = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			  <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Link className="link-register" to="/register">
        Si no tienes cuenta, regístrate AQUÍ
      </Link>
    </Form>
			
		</div>
	);
};