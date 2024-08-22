import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userRegistration } from "../utilities"; // Import the registration function

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null); // For handling errors

	const handleSignUp = async (e) => {
		e.preventDefault(); // Prevent the default form submission

		// Call the userRegistration function from utilities.js
		const user = await userRegistration(email, password);

		if (user) {
			// Handle successful signup (e.g., redirect to a login page or dashboard)
			console.log("User registered successfully:", user);
		} else {
			// Handle errors during signup
			setError("Registration failed. Please try again.");
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<Form onSubmit={handleSignUp}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						placeholder="Enter email"
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				{error && <p style={{ color: "red" }}>{error}</p>}{" "}
				{/* Display error message if there's an error */}
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	);
};

export default SignUp;
