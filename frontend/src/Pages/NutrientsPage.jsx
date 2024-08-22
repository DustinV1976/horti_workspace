import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NutrientForm from "../components/NutrientForm";
import NutrientList from "../components/NutrientList";
import { api } from "../utilities";

const NutrientsPage = () => {
	const [nutrients, setNutrients] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		fetchNutrients();
	}, []);

	const fetchNutrients = async () => {
		try {
			const response = await api.get("nutrients/my_nutrients/");
			setNutrients(response.data);
		} catch (error) {
			console.error("Error fetching nutrients:", error);
		}
	};

	const handleAddNutrient = async (newNutrient) => {
		try {
			await api.post("nutrients/", newNutrient);
			fetchNutrients();
			setShowForm(false);
		} catch (error) {
			console.error("Error adding nutrient:", error);
		}
	};

	return (
		<Container>
			<h1 className="my-4">My Nutrients</h1>
			<Row>
				<Col md={8}>
					<NutrientList nutrients={nutrients} />
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Button onClick={() => setShowForm(!showForm)}>
								{showForm ? "Cancel" : "Add New Nutrient"}
							</Button>
							{showForm && <NutrientForm onSubmit={handleAddNutrient} />}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default NutrientsPage;
