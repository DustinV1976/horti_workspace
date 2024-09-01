import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { setAuthToken } from "./api";
import "./App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (token && storedUser) {
			setAuthToken(token);
			setIsLoggedIn(true);
			setUser(storedUser);
			navigate("/");
		}
	}, [navigate]);

	return (
		<>
			<Navbar
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
				user={user}
				setUser={setUser}
			/>
			<Outlet context={[isLoggedIn, setIsLoggedIn, user, setUser]} />
		</>
	);
}

export default App;
