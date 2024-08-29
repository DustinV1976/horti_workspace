import React, { useState, useEffect } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import axios from "axios";
import NutrientForm from "../components/NutrientForm";
import NutrientList from "../components/NutrientList";
import "../Styling/NutrientsPage.css";

const NutrientsPage = () => {
	const [nutrients, setNutrients] = useState([]);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		fetchNutrients();
	}, []);

	const fetchNutrients = async () => {
		const token = localStorage.getItem("authToken");
		try {
			const response = await axios.get("/api/v1/nutrients/", {
				headers: { Authorization: `Token ${token}` },
			});
			setNutrients(response.data);
			setError("");
		} catch (err) {
			setError("Failed to fetch nutrients. Please try again.");
		}
	};

	const handleNutrientAdded = (newNutrient) => {
		setNutrients([...nutrients, newNutrient]);
	};

	const handleEdit = (nutrient) => {
		console.log("Edit nutrient:", nutrient);
	};

	const handleClose = () => {
		setShowForm(false);
	};

	return (
		<Container>
			<h1>My Nutrients</h1>
			{error && <Alert variant="danger">{error}</Alert>}
			<Button variant="primary" onClick={() => setShowForm(true)}>
				Add Nutrient
			</Button>
			<NutrientForm
				handleClose={handleClose}
				onNutrientAdded={handleNutrientAdded}
				show={showForm}
			/>
			{nutrients.length === 0 ? (
				<Alert variant="info">
					No nutrients added yet, please add for use in Fertilizing Schedule
				</Alert>
			) : (
				<div className="nutrient-grid">
					<NutrientList nutrients={nutrients} onEdit={handleEdit} />
				</div>
			)}
		</Container>
	);
};

export default NutrientsPage;
