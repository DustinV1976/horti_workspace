import React, { useState, useEffect } from "react";
import { login, logout, signup, getCurrentUser, isAuthenticated } from "./Auth";

const HomePage = () => {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const currentUser = getCurrentUser();
		if (currentUser) {
			setUser(currentUser);
		}
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const data = await login(email, password);
			setUser(data);
			setEmail("");
			setPassword("");
		} catch (error) {
			console.error("Login error", error);
			setError("Login failed. Please check your credentials.");
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const data = await signup(email, password);
			setUser(data);
			setEmail("");
			setPassword("");
		} catch (error) {
			console.error("Signup error", error);
			setError("Signup failed. Please try again.");
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			setUser(null);
		} catch (error) {
			console.error("Logout error", error);
			setError("Logout failed. Please try again.");
		}
	};

	return (
		<div>
			<h1>Welcome to Our App</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{isAuthenticated() ? (
				<div>
					<p>Hello, {user.email}!</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					<form onSubmit={handleLogin}>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							required
						/>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
						/>
						<button type="submit">Login</button>
					</form>
					<button onClick={handleSignup}>Sign Up</button>
				</div>
			)}
		</div>
	);
};

export default HomePage;
