import React, { useState, useEffect } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import axios from "axios";
import NutrientForm from "../components/NutrientForm";
import NutrientCard from "../components/NutrientCard";
import { useOutletContext } from "react-router-dom";
import "../Styling/NutrientsPage.css";

const NutrientsPage = () => {
	const { user } = useOutletContext();
	const [nutrients, setNutrients] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchNutrients();
	}, []);

	const fetchNutrients = async () => {
		const token = localStorage.getItem("authToken");
		console.log("Fetching nutrients with token:", token);
		try {
			const response = await axios.get("/api/v1/nutrients/", {
				headers: { Authorization: `Token ${token}` },
			});
			console.log("Fetched nutrients:", response.data);
			setNutrients(response.data);
			setError(null);
		} catch (error) {
			console.error(
				"Error fetching nutrients:",
				error.response?.data || error.message
			);
			setError("Failed to fetch nutrients. Please try again.");
		}
	};

	const handleAddNutrient = async (nutrientData) => {
		const token = localStorage.getItem("authToken");
		console.log("Adding nutrient with data:", nutrientData);
		console.log("Using token:", token);
		try {
			const response = await axios.post("/api/v1/nutrients/", nutrientData, {
				headers: { Authorization: `Token ${token}` },
			});
			console.log("Add nutrient response:", response.data);
			setNutrients([...nutrients, response.data]);
			setShowAddForm(false);
			setError(null);
		} catch (error) {
			console.error(
				"Error adding nutrient:",
				error.response?.data || error.message
			);
			setError("Failed to add nutrient. Please try again.");
		}
	};

	return (
		<Container className="nutrients-page">
			{user && (
				<h1 className="text-center">
					Welcome to your nutrients, {user.username}!
				</h1>
			)}

			<Button
				onClick={() => setShowAddForm(true)}
				className="add-nutrient-button"
			>
				Add Nutrient
			</Button>

			{error && <Alert variant="danger">{error}</Alert>}

			{showAddForm && (
				<NutrientForm
					handleClose={() => setShowAddForm(false)}
					handleAddNutrient={handleAddNutrient}
					show={showAddForm}
				/>
			)}

			<div className="nutrient-grid">
				{nutrients.map((nutrient) => (
					<NutrientCard key={nutrient.id} nutrient={nutrient} />
				))}
			</div>
		</Container>
	);
};

export default NutrientsPage;
