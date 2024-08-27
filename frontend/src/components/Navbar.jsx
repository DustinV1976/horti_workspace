import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { logout } from "../api";

const NavBar = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			localStorage.removeItem("authToken");
			localStorage.removeItem("user");
			setIsLoggedIn(false);
			setUser(null);
			navigate("/");
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand as={Link} to="/">
				My Garden App
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					{isLoggedIn ? (
						<>
							<Nav.Link as={Link} to="/">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/mygarden">
								My Garden
							</Nav.Link>
							<Nav.Link as={Link} to="/nutrients">
								Nutrients
							</Nav.Link>
						</>
					) : (
						<>
							<Nav.Link as={Link} to="/signup">
								Sign Up
							</Nav.Link>
							<Nav.Link as={Link} to="/login">
								Log In
							</Nav.Link>
						</>
					)}
				</Nav>
				{isLoggedIn && (
					<Nav>
						<Button onClick={handleLogout} variant="outline-primary">
							Log Out
						</Button>
					</Nav>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

NavBar.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	setIsLoggedIn: PropTypes.func.isRequired,
	user: PropTypes.object,
};

export default NavBar;
