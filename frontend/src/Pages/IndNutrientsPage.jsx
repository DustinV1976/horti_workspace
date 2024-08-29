import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styling/IndNutrientsPage.css";

const IndNutrientsPage = () => {
	const { id } = useParams(); // Get the nutrient ID from the URL parameters
	const [nutrient, setNutrient] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchNutrient = async () => {
			const token = localStorage.getItem("authToken");
			try {
				const response = await axios.get(`/api/v1/nutrients/${id}/`, {
					headers: { Authorization: `Token ${token}` },
				});
				setNutrient(response.data);
				setError("");
			} catch (err) {
				setError("Failed to fetch nutrient. Please try again.");
			}
		};

		fetchNutrient();
	}, [id]);

	if (error) {
		return <p>{error}</p>;
	}

	if (!nutrient) {
		return <p>Loading...</p>;
	}

	return (
		<div className="ind-nutrient-page">
			<h1>{nutrient.name}</h1>
			<p>{nutrient.description}</p>
			<p>
				Amount: {nutrient.amount} {nutrient.unit}
			</p>
			<p>Nitrogen: {nutrient.nitrogen}</p>
			<p>Phosphorus: {nutrient.phosphorus}</p>
			<p>Potassium: {nutrient.potassium}</p>
		</div>
	);
};

export default IndNutrientsPage;
