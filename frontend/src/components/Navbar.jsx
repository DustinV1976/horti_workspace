import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { userLogOut } from "../utilities";

function NavBar({ setUser, user }) {
	const handleLogout = async () => {
		try {
			const result = await userLogOut();
			setUser(result);
		} catch (error) {
			console.error("Error during logout:", error);
			alert("An error occurred during logout. Please try again.");
		}
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Home
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{!user ? (
							<>
								<Nav.Link as={Link} to="/signup/">
									Sign Up
								</Nav.Link>
								<Nav.Link as={Link} to="/login/">
									Log In
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={Link} to="/lists/">
									Lists
								</Nav.Link>
								<Nav.Link as={Link} to="/nutrients/">
									Nutrients
								</Nav.Link>
								<Nav.Link as={Link} to="/mygarden/">
									My Garden
								</Nav.Link>
								<Button variant="outline-danger" onClick={handleLogout}>
									Log Out
								</Button>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
