import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { api } from "../utilities";

const MyGardenPage = () => {
	const [garden, setGarden] = useState(null);
	const [loading, setLoading] = useState(true);
	const [edit, setEdit] = useState(false);
	const [name, setName] = useState("");
	const [plantType, setPlantType] = useState("");

	useEffect(() => {
		const fetchGarden = async () => {
			try {
				const response = await api.get("/api/mygarden/");
				const gardenData = response.data;
				setGarden(gardenData);
				setName(gardenData.name);
				setPlantType(gardenData.plant_type);
			} catch (error) {
				console.error("Error fetching garden data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchGarden();
	}, []);

	const cancelEdit = () => {
		if (garden) {
			setName(garden.name);
			setPlantType(garden.plant_type);
		}
		setEdit(false);
	};

	const editGarden = async () => {
		try {
			const response = await api.put(`gardens/${garden.id}/`, {
				name: name,
				plant_type: plantType,
			});
			if (response.status === 200) {
				alert("Garden has been successfully updated!");
				setEdit(false);
				setGarden({ ...garden, name, plant_type: plantType });
			} else {
				alert("Failed to update garden. Please try again.");
				cancelEdit();
			}
		} catch (error) {
			console.error("Error updating garden:", error);
			alert("An error occurred while updating the garden.");
			cancelEdit();
		}
	};

	return (
		<Container>
			<h1>My Garden</h1>
			{loading ? (
				<Spinner animation="border" />
			) : (
				<Row>
					<Col xs={6}>
						{edit ? (
							<Form.Control
								type="text"
								placeholder={garden.name}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						) : (
							<h2>{name}</h2>
						)}
					</Col>
					<Col xs={3}>
						{edit ? (
							<Form.Control
								type="text"
								placeholder={garden.plant_type}
								value={plantType}
								onChange={(e) => setPlantType(e.target.value)}
							/>
						) : (
							<p>{plantType}</p>
						)}
					</Col>
					{edit ? (
						<>
							<Col xs={1} onClick={() => cancelEdit()}>
								❌
							</Col>
							<Col xs={1} onClick={() => editGarden()}>
								✅
							</Col>
						</>
					) : (
						<Col xs={1} onClick={() => setEdit(true)}>
							✏️
						</Col>
					)}
				</Row>
			)}
		</Container>
	);
};

export default MyGardenPage;
