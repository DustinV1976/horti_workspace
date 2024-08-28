import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { logout } from "../api";

const NavBar = ({ isLoggedIn, setIsLoggedIn, setUser, user }) => {
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
			<Container>
				<Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
					<img
						src="/images/horti_logo.WEBP"
						alt="Horti Logo"
						style={{ width: "80px", height: "80px", marginRight: "10px" }}
					/>
					<span
						style={{ fontFamily: "'Cursive', sans-serif", fontSize: "24px" }}
					>
						Horti
					</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav>
						{isLoggedIn ? (
							<>
								<Nav.Link as={Link} to="/mygarden">
									My Garden
								</Nav.Link>
								<Nav.Link as={Link} to="/nutrients">
									Nutrients
								</Nav.Link>
								<Button onClick={handleLogout} variant="outline-primary">
									Log Out
								</Button>
							</>
						) : (
							<>
								<Nav.Link as={Link} to="/login">
									<Button variant="outline-primary">Log In</Button>
								</Nav.Link>
								<Nav.Link as={Link} to="/signup">
									<Button variant="primary">Sign Up</Button>
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

NavBar.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	setIsLoggedIn: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired,
	user: PropTypes.shape({
		username: PropTypes.string,
	}),
};

export default NavBar;
