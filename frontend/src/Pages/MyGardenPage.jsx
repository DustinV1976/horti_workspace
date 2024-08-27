import React, { useState, useEffect } from "react";
import { getPlants, addPlant, deletePlant } from "../api";
import PlantCard from "../components/PlantCard";
import NavBar from "../components/Navbar";
import { Button, Modal, Form } from "react-bootstrap";

const MyGardenPage = () => {
	const [plants, setPlants] = useState([]);
	const [error, setError] = useState(""); // Using only the error state
	const [show, setShow] = useState(false);
	const [newPlant, setNewPlant] = useState({
		name: "",
		date_planted: "",
		photo: null,
	});

	useEffect(() => {
		fetchPlants();
	}, []);

	const fetchPlants = async () => {
		try {
			const response = await getPlants();
			setPlants(response.data);
			setError(""); // Clear any previous errors
		} catch (err) {
			setError("Failed to fetch plants. Please try again.");
		}
	};

	const handleAddPlant = async () => {
		try {
			await addPlant(newPlant);
			fetchPlants();
			setShow(false);
			setNewPlant({ name: "", date_planted: "", photo: null });
			setError(""); // Clear any previous errors
		} catch (err) {
			setError("Failed to add plant. Please try again.");
		}
	};

	const handleDeletePlant = async (plantId) => {
		try {
			await deletePlant(plantId);
			fetchPlants();
			setError(""); // Clear any previous errors
		} catch (err) {
			setError("Failed to delete plant. Please try again.");
		}
	};

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleInputChange = (e) => {
		const { name, value, files } = e.target;
		setNewPlant((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h1>My Garden</h1>
				<Button variant="primary" onClick={handleShow}>
					Add Plant
				</Button>
			</div>
			{error && <p style={{ color: "red" }}>{error}</p>}{" "}
			{/* Display any error messages */}
			<div className="plant-list">
				{plants.map((plant) => (
					<PlantCard
						key={plant.id}
						plant={plant}
						onDelete={handleDeletePlant}
					/>
				))}
			</div>
			{/* Modal for adding a new plant */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Plant</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formPlantName">
							<Form.Label>Plant Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter plant name"
								name="name"
								value={newPlant.name}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formDatePlanted">
							<Form.Label>Date Planted</Form.Label>
							<Form.Control
								type="date"
								name="date_planted"
								value={newPlant.date_planted}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPlantPhoto">
							<Form.Label>Plant Photo</Form.Label>
							<Form.Control
								type="file"
								name="photo"
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleAddPlant}>
						Add Plant
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default MyGardenPage;
