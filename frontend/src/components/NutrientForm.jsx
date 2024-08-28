import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const NutrientForm = ({ onNutrientAdded }) => {
	const [nutrient, setNutrient] = useState({
		name: "",
		description: "",
		amount: "",
		nitrogen: "",
		phosphorus: "",
		potassium: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNutrient((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("authToken");
		const config = {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await axios.post("/api/v1/nutrients/", nutrient, config);
			onNutrientAdded(response.data);
			setNutrient({
				name: "",
				description: "",
				amount: "",
				nitrogen: "",
				phosphorus: "",
				potassium: "",
			});
		} catch (error) {
			console.error("Error adding nutrient:", error);
			// Handle error (e.g., show error message to user)
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formName">
				<Form.Label>Name*</Form.Label>
				<Form.Control
					type="text"
					name="name"
					value={nutrient.name}
					onChange={handleChange}
					required
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group controlId="formDescription">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					name="description"
					value={nutrient.description}
					onChange={handleChange}
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group controlId="formAmount">
				<Form.Label>Amount (tsp/gallon)*</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="amount"
					value={nutrient.amount}
					onChange={handleChange}
					required
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group controlId="formNitrogen">
				<Form.Label>Nitrogen (N)</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="nitrogen"
					value={nutrient.nitrogen}
					onChange={handleChange}
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group controlId="formPhosphorus">
				<Form.Label>Phosphorus (P)</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="phosphorus"
					value={nutrient.phosphorus}
					onChange={handleChange}
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group controlId="formPotassium">
				<Form.Label>Potassium (K)</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="potassium"
					value={nutrient.potassium}
					onChange={handleChange}
					autoComplete="off"
				/>
			</Form.Group>
			<Button type="submit">Add Nutrient</Button>
		</Form>
	);
};

export default NutrientForm;
