import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { signup, setAuthToken } from "../api";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [, setIsLoggedIn, , setUser] = useOutletContext();

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await signup({
				email,
				password,
				display_name: displayName,
			});
			const { token, user } = response.data;
			localStorage.setItem("authToken", token);
			localStorage.setItem("user", JSON.stringify(user));
			setAuthToken(token);
			setIsLoggedIn(true);
			setUser(user);
			navigate("/mygarden");
		} catch (err) {
			setError(
				err.response?.data?.error || "Registration failed. Please try again."
			);
		}
	};
	return (
		<Form onSubmit={handleSignUp}>
			<h2>Sign Up</h2>
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
				<Form.Label>Display Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter display name"
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
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
				Sign Up
			</Button>
		</Form>
	);
};

export default SignUp;
