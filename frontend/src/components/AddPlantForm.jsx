import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const AddPlantForm = ({ handleClose, handleAddPlant }) => {
	const [plantData, setPlantData] = useState({
		name: "",
		date_planted: "",
		type: "flower",
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPlantData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		console.log("Submitting plant data:", plantData);

		try {
			await handleAddPlant(plantData);
			setError(null);
			console.log("Plant added successfully:", plantData);
		} catch (err) {
			setError("Failed to add plant. Please try again.");
			console.error("Error adding plant:", err);
		} finally {
			setLoading(false);
		}

		handleClose();
	};

	return (
		<Modal show onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add Plant</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Plant Name</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={plantData.name}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Plant Type</Form.Label>
						<Form.Control
							as="select"
							name="type"
							value={plantData.type}
							onChange={handleChange}
							required
						>
							<option value="herb">Herb</option>
							<option value="flower">Flower</option>
							<option value="vegetable">Vegetable</option>
							<option value="fruit">Fruit</option>
						</Form.Control>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Date Planted</Form.Label>
						<Form.Control
							type="date"
							name="date_planted"
							value={plantData.date_planted}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Button variant="secondary" onClick={handleClose} disabled={loading}>
						Close
					</Button>
					<Button variant="primary" type="submit" disabled={loading}>
						Add Plant
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

AddPlantForm.propTypes = {
	handleClose: PropTypes.func.isRequired,
	handleAddPlant: PropTypes.func.isRequired,
};

export default AddPlantForm;
