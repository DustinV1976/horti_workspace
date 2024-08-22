import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "./Auth";
import "./Navbar.css";

const Navbar = () => {
	const handleLogout = () => {
		logout();
		// You might want to add a redirect here or update the app state
	};

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<Link to="/" className="nav-link">
					Home
				</Link>
			</div>
			<div className="navbar-center">
				<Link to="/my-garden" className="nav-link">
					My Garden
				</Link>
				<Link to="/nutrients" className="nav-link">
					Nutrients
				</Link>
			</div>
			<div className="navbar-right">
				{isAuthenticated() ? (
					<button onClick={handleLogout} className="nav-button">
						Logout
					</button>
				) : (
					<>
						<Link to="/login" className="nav-link">
							Login
						</Link>
						<Link to="/signup" className="nav-link">
							Signup
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
