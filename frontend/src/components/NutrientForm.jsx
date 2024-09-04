import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const NutrientForm = ({ handleClose, handleAddNutrient, show }) => {
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

		// Prepare the nutrient data, only include non-empty values
		const nutrientData = {
			name: nutrient.name,
			description: nutrient.description,
			amount: parseFloat(nutrient.amount),
		};

		if (nutrient.nitrogen)
			nutrientData.nitrogen = parseFloat(nutrient.nitrogen);
		if (nutrient.phosphorus)
			nutrientData.phosphorus = parseFloat(nutrient.phosphorus);
		if (nutrient.potassium)
			nutrientData.potassium = parseFloat(nutrient.potassium);

		console.log("Sending nutrient data:", nutrientData);

		try {
			await handleAddNutrient(nutrientData);
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
			console.error("Error adding nutrient:", error);
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
						<Form.Label>Name*</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={nutrient.name}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							name="description"
							value={nutrient.description}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Amount*</Form.Label>
						<Form.Control
							type="number"
							step="1"
							name="amount"
							value={nutrient.amount}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Nitrogen (N)</Form.Label>
						<Form.Control
							type="number"
							step="1"
							name="nitrogen"
							value={nutrient.nitrogen}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Phosphorus (P)</Form.Label>
						<Form.Control
							type="number"
							step="1"
							name="phosphorus"
							value={nutrient.phosphorus}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Potassium (K)</Form.Label>
						<Form.Control
							type="number"
							step="1"
							name="potassium"
							value={nutrient.potassium}
							onChange={handleChange}
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

NutrientForm.propTypes = {
	handleClose: PropTypes.func.isRequired,
	handleAddNutrient: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
};

export default NutrientForm;
