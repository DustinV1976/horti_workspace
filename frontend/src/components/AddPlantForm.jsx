import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";

const AddPlantForm = ({ handleClose, handleAddPlant }) => {
	const [plantData, setPlantData] = useState({
		name: "",
		date_planted: "",
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

		try {
			await handleAddPlant(plantData);
			setError(null);
		} catch (err) {
			setError("Failed to add plant. Please try again.");
			console.error("Error:", err);
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
						{loading ? <Spinner animation="border" size="sm" /> : "Add Plant"}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default AddPlantForm;
