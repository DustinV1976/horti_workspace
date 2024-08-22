import { useState, useEffect } from "react";
import axios from "axios";
import "./MyGardenPage.css";

const MyGardenPage = () => {
	const [plants, setPlants] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [datePlanted, setDatePlanted] = useState("");
	const [image, setImage] = useState(null);

	useEffect(() => {
		fetchPlants();
	}, []);

	const fetchPlants = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/v1/plants/", {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			setPlants(response.data);
		} catch (error) {
			console.error("Error fetching plants:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("date_planted", datePlanted);
		if (type) formData.append("type", type);
		if (image) formData.append("image", image);

		try {
			await axios.post("http://localhost:8000/api/v1/plants/", formData, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
					"Content-Type": "multipart/form-data",
				},
			});
			fetchPlants();
			setShowForm(false);
			setName("");
			setType("");
			setDatePlanted("");
			setImage(null);
		} catch (error) {
			console.error("Error adding plant:", error);
		}
	};

	return (
		<div className="my-garden-page">
			<h1>My Garden</h1>
			<button onClick={() => setShowForm(true)} className="add-plant-button">
				Add Plant
			</button>

			{showForm && (
				<div className="modal">
					<div className="modal-content">
						<h2>Add a New Plant</h2>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Plant Name"
								required
							/>
							<input
								type="text"
								value={type}
								onChange={(e) => setType(e.target.value)}
								placeholder="Plant Type (optional)"
							/>
							<input
								type="date"
								value={datePlanted}
								onChange={(e) => setDatePlanted(e.target.value)}
								required
							/>
							<input
								type="file"
								onChange={(e) => setImage(e.target.files[0])}
							/>
							<div className="form-buttons">
								<button type="submit">Add Plant</button>
								<button type="button" onClick={() => setShowForm(false)}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{plants.length === 0 ? (
				<p>Your garden is empty. Click 'Add Plant' to start your garden!</p>
			) : (
				<div className="plant-grid">
					{plants.map((plant) => (
						<div key={plant.id} className="plant-card">
							{plant.image && <img src={plant.image} alt={plant.name} />}
							<h2>{plant.name}</h2>
							{plant.type && <p>Type: {plant.type}</p>}
							<p>Planted: {plant.date_planted}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MyGardenPage;
