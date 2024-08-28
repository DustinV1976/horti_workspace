import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import NutrientForm from "../components/NutrientForm";
import NutrientList from "../components/NutrientList";

const NutrientsPage = () => {
	const [nutrients, setNutrients] = useState([]);
	const [error, setError] = useState("");

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
		// Implement edit functionality
		console.log("Edit nutrient:", nutrient);
	};

	return (
		<Container>
			<h1>My Nutrients</h1>
			{error && <Alert variant="danger">{error}</Alert>}
			<NutrientForm onNutrientAdded={handleNutrientAdded} />
			{nutrients.length === 0 ? (
				<Alert variant="info">
					No nutrients added yet, please add for use in Fertilizing Schedule
				</Alert>
			) : (
				<NutrientList nutrients={nutrients} onEdit={handleEdit} />
			)}
		</Container>
	);
};

export default NutrientsPage;
