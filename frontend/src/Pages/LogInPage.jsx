import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { login, setAuthToken } from "../api";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [, setIsLoggedIn, , setUser] = useOutletContext();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await login({ email, password });
			const { token, user } = response.data;
			localStorage.setItem("authToken", token);
			localStorage.setItem("user", JSON.stringify(user));
			setAuthToken(token);
			setIsLoggedIn(true);
			setUser(user);
			navigate("/mygarden");
		} catch (err) {
			setError(err.response?.data?.error || "Login failed. Please try again.");
		}
	};

	return (
		<Form onSubmit={handleLogin}>
			<h2>Login</h2>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form.Group className="mb-3">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Login
			</Button>
		</Form>
	);
};

export default Login;
