import React, { useState, useEffect } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import PlantCard from "../components/PlantCard";
import AddPlantForm from "../components/AddPlantForm";
import { useOutletContext } from "react-router-dom";
import { getPlants, addPlant, updatePlant, deletePlant } from "../api";

const MyGardenPage = () => {
	const context = useOutletContext();
	const { user } = context || {}; // Removed isLoggedIn and setUser as they are unused

	const [plants, setPlants] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchPlants();
	}, []);

	const fetchPlants = async () => {
		try {
			const response = await getPlants();
			setPlants(response.data || []); // Fallback to empty array if data is undefined
			setError(null);
		} catch (error) {
			setError("Failed to fetch plants. Please add a plant.");
		}
	};

	const handleAddPlant = async (plantData) => {
		try {
			const response = await addPlant(plantData);
			setPlants([...plants, response.data]);
			setShowAddForm(false);
			setError(null);
		} catch (error) {
			setError("Failed to add plant. Please try again.");
		}
	};

	const handleUpdatePlant = async (plantId, updatedData) => {
		try {
			const response = await updatePlant(plantId, updatedData);
			setPlants(
				plants.map((plant) => (plant.id === plantId ? response.data : plant))
			);
			setError(null);
		} catch (error) {
			setError("Failed to update plant. Please try again.");
		}
	};

	const handleDeletePlant = async (plantId) => {
		try {
			await deletePlant(plantId);
			setPlants(plants.filter((plant) => plant.id !== plantId));
			setError(null);
		} catch (error) {
			setError("Failed to delete plant. Please try again.");
		}
	};

	return (
		<Container className="my-garden-page">
			{/* Display the user's garden if user data is available */}
			{user && (
				<h1 className="text-center">
					Welcome to your garden, {user.username}!
				</h1>
			)}

			<Button onClick={() => setShowAddForm(true)} className="add-plant-button">
				Add Plant
			</Button>

			{error && <Alert variant="danger">{error}</Alert>}

			{showAddForm && (
				<AddPlantForm
					handleClose={() => setShowAddForm(false)}
					handleAddPlant={handleAddPlant}
				/>
			)}

			<div className="plant-grid">
				{plants.map((plant) => (
					<PlantCard
						key={plant.id}
						plant={plant}
						onUpdate={(updatedPlant) => {
							handleUpdatePlant(plant.id, updatedPlant);
						}}
						onDelete={() => handleDeletePlant(plant.id)}
					/>
				))}
			</div>
		</Container>
	);
};

export default MyGardenPage;
