import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import MyGardenPage from "./MyGardenPage";
import NutrientsPage from "./NutrientsPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/my-garden" element={<MyGardenPage />} />
					<Route path="/nutrients" element={<NutrientsPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
