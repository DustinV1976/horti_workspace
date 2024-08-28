import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import PlantCard from "../component/PlantCard";
import AddPlantForm from "../components/AddPlantForm";

const MyGardenPage = () => {
	const [plants, setPlants] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);

	useEffect(() => {
		fetchPlants();
	}, []);

	const fetchPlants = async () => {
		// ... (your existing fetchPlants code)
	};

	const handleAddPlant = async (plantData) => {
		const token = localStorage.getItem("authToken");
		try {
			const response = await axios.post("/api/plants/", plantData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			});
			setPlants([...plants, response.data]);
		} catch (error) {
			console.error("Error adding plant:", error);
		}
	};

	return (
		<div className="my-garden-page">
			<h1>My Garden</h1>
			<Button onClick={() => setShowAddForm(true)} className="add-plant-button">
				Add Plant
			</Button>
			<AddPlantForm
				show={showAddForm}
				handleClose={() => setShowAddForm(false)}
				handleAddPlant={handleAddPlant}
			/>
			<div className="plant-grid">
				{plants.map((plant) => (
					<PlantCard key={plant.id} plant={plant} />
				))}
			</div>
		</div>
	);
};

export default MyGardenPage;
