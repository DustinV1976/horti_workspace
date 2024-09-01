import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { signup, setAuthToken } from "../api";

const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [, setIsLoggedIn, , setUser] = useOutletContext();

	const validateForm = () => {
		if (!email || !username || !password) {
			setError("All fields are required.");
			return false;
		}
		return true;
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError("");

		if (!validateForm()) return;

		try {
			const response = await signup({
				email,
				password,
				username,
			});
			const { token, user } = response.data;

			console.log("Signup successful, setting token and user:", {
				token,
				user,
			});

			localStorage.setItem("authToken", token);
			localStorage.setItem("user", JSON.stringify(user));
			setAuthToken(token);

			setIsLoggedIn(true);
			setUser(user);

			navigate("/mygarden");
		} catch (err) {
			const message =
				err.response?.data?.error || "Registration failed. Please try again.";
			setError(message);
			console.error("Signup error:", message);
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
				<Form.Label>Username</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
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

export default SignUpPage;
