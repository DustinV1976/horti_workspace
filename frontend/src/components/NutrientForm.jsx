import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const NutrientForm = ({ handleClose, onNutrientAdded, show }) => {
	const [nutrient, setNutrient] = useState({
		name: "",
		description: "",
		amount: "",
		nitrogen: "",
		phosphorus: "",
		potassium: "",
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNutrient((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const token = localStorage.getItem("authToken");

		// Prepare the nutrient data, only include non-empty values
		const nutrientData = {
			name: nutrient.name,
			description: nutrient.description,
			amount: nutrient.amount,
		};

		if (nutrient.nitrogen) nutrientData.nitrogen = nutrient.nitrogen;
		if (nutrient.phosphorus) nutrientData.phosphorus = nutrient.phosphorus;
		if (nutrient.potassium) nutrientData.potassium = nutrient.potassium;

		const config = {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		};

		console.log("Sending nutrient data:", nutrientData);

		try {
			const response = await axios.post(
				"/api/v1/nutrients/",
				nutrientData,
				config
			);
			onNutrientAdded(response.data);
			setNutrient({
				name: "",
				description: "",
				amount: "",
				nitrogen: "",
				phosphorus: "",
				potassium: "",
			});
			setError(null);
			handleClose();
		} catch (error) {
			setError("Error adding nutrient. Please try again.");
			console.error("Error adding nutrient:", error.response.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add Nutrient</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="name">Name*</Form.Label>
						<Form.Control
							type="text"
							id="name"
							name="name"
							value={nutrient.name}
							onChange={handleChange}
							required
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="description">Description</Form.Label>
						<Form.Control
							as="textarea"
							id="description"
							name="description"
							value={nutrient.description}
							onChange={handleChange}
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="amount">Amount (tsp/gallon)*</Form.Label>
						<Form.Control
							type="number"
							step="1"
							id="amount"
							name="amount"
							value={nutrient.amount}
							onChange={handleChange}
							required
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="nitrogen">Nitrogen (N)</Form.Label>
						<Form.Control
							type="number"
							step="1"
							id="nitrogen"
							name="nitrogen"
							value={nutrient.nitrogen}
							onChange={handleChange}
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="phosphorus">Phosphorus (P)</Form.Label>
						<Form.Control
							type="number"
							step="1"
							id="phosphorus"
							name="phosphorus"
							value={nutrient.phosphorus}
							onChange={handleChange}
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="potassium">Potassium (K)</Form.Label>
						<Form.Control
							type="number"
							step="1"
							id="potassium"
							name="potassium"
							value={nutrient.potassium}
							onChange={handleChange}
							autoComplete="off"
						/>
					</Form.Group>
					<Button variant="secondary" onClick={handleClose} disabled={loading}>
						Close
					</Button>
					<Button variant="primary" type="submit" disabled={loading}>
						Add Nutrient
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

// Prop type validation
NutrientForm.propTypes = {
	handleClose: PropTypes.func.isRequired,
	onNutrientAdded: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
};

export default NutrientForm;
