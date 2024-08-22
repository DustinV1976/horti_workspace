import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { api } from "../utilities";

const MyGardenDisplay = ({ garden }) => {
	const [edit, setEdit] = useState(false);
	const [name, setName] = useState(garden.name);
	const [plantType, setPlantType] = useState(garden.plant_type);

	const cancelEdit = () => {
		setName(garden.name);
		setPlantType(garden.plant_type);
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
					name
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
					plantType
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
	);
};
