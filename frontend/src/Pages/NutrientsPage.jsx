import React, { useState, useEffect } from "react";
import axios from "axios";

import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Alert,
} from "react-bootstrap";
import NutrientForm from "../components/NutrientForm";
import NutrientList from "../components/NutrientList";
import { getNutrients, addNutrient, updateNutrient } from "../api";

const NutrientsPage = () => {
	const [nutrients, setNutrients] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [editingNutrient, setEditingNutrient] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			fetchNutrients();
		} else {
			setError("Please log in to view your nutrients.");
		}
	}, []);

	const fetchNutrients = async () => {
		try {
			const response = await getNutrients();
			setNutrients(response.data);
			setError(null);
		} catch (error) {
			console.error("Error fetching nutrients:", error);
			setError("Failed to fetch nutrients. Please try again.");
		}
	};

	const handleAddOrUpdateNutrient = async (nutrientData) => {
		try {
			if (editingNutrient) {
				await updateNutrient(editingNutrient.id, nutrientData);
			} else {
				await addNutrient(nutrientData);
			}
			await fetchNutrients();
			setShowForm(false);
			setEditingNutrient(null);
			setError(null);
		} catch (error) {
			console.error("Error adding/updating nutrient:", error);
			setError("Failed to add/update nutrient. Please try again.");
		}
	};

	const handleEdit = (nutrient) => {
		setEditingNutrient(nutrient);
		setShowForm(true);
	};

	return (
		<Container>
			<h1 className="my-4">My Nutrients</h1>
			{error && <Alert variant="danger">{error}</Alert>}
			<Row>
				<Col md={8}>
					{nutrients.length === 0 ? (
						<Alert variant="info">
							No nutrients added yet, please add for use in Fertilizing Schedule
						</Alert>
					) : (
						<NutrientList nutrients={nutrients} onEdit={handleEdit} />
					)}
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Button
								onClick={() => {
									setShowForm(!showForm);
									setEditingNutrient(null);
								}}
							>
								{showForm ? "Cancel" : "Add New Nutrient"}
							</Button>
							{showForm && (
								<NutrientForm
									onSubmit={handleAddOrUpdateNutrient}
									initialData={editingNutrient || {}}
								/>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default NutrientsPage;
