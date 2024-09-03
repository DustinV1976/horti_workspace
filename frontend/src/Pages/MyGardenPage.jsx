import React, { useState, useEffect } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import PlantCard from "../components/PlantCard";
import AddPlantForm from "../components/AddPlantForm";
import { useOutletContext } from "react-router-dom";
import { getPlants, addPlant } from "../api";
import "../Styling/MyGardenPage.css";

const MyGardenPage = () => {
  const { user } = useOutletContext();
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
      setPlants(response.data || []);
      setError(null);
    } catch (error) {
      setError("Failed to fetch plants. Please try again.");
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
        />
      )}

      <div className="plant-grid">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </Container>
  );
};

export default MyGardenPage;