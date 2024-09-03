import React, { useState, useEffect } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import PlantCard from "../components/PlantCard";
import AddPlantForm from "../components/AddPlantForm";
import { useOutletContext } from "react-router-dom";
import { getPlants, addPlant, updatePlant, deletePlant } from "../api";
import "../Styling/MyGardenPage.css";

const MyGardenPage = () => {
	const { isLoggedIn, setIsLoggedIn, user, setUser } = useOutletContext(); // Destructure as an object if that's what it's returning
	const [plants, setPlants] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchPlants();
	}, []);

	const fetchPlants = async () => {
		try {
			console.log("Fetching plants for user:", user);
			const response = await getPlants();
			setPlants(response.data || []); // Fallback to empty array if data is undefined
			setError(null);
		} catch (error) {
			setError("Failed to fetch plants. Please add a plant.");
			console.error("Error fetching plants:", error);
		}
	};

	const handleAddPlant = async (plantData) => {
		try {
			console.log("Adding plant with data:", plantData);
			const response = await addPlant(plantData);
			setPlants([...plants, response.data]);
			setShowAddForm(false);
			setError(null);
		} catch (error) {
			setError("Failed to add plant. Please try again.");
			console.error("Error adding plant:", error);
		}
	};

	const handleUpdatePlant = async (plantId, updatedData) => {
		try {
			console.log("Updating plant with ID:", plantId, "Data:", updatedData);
			const response = await updatePlant(plantId, updatedData);
			setPlants(
				plants.map((plant) => (plant.id === plantId ? response.data : plant))
			);
			setError(null);
		} catch (error) {
			setError("Failed to update plant. Please try again.");
			console.error("Error updating plant:", error);
		}
	};

	const handleDeletePlant = async (plantId) => {
		try {
			console.log("Deleting plant with ID:", plantId);
			await deletePlant(plantId);
			setPlants(plants.filter((plant) => plant.id !== plantId));
			setError(null);
		} catch (error) {
			setError("Failed to delete plant. Please try again.");
			console.error("Error deleting plant:", error);
		}
	};

	return (
		<Container className="my-garden-page">
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
					user={user} // Pass the user object to AddPlantForm
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
