import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PlantCard = ({ plant, onDelete }) => {
	const defaultImage = "./assets/tree_book1.jpg";

	return (
		<Card>
			<Card.Img
				variant="top"
				src={plant.photo ? URL.createObjectURL(plant.photo) : defaultImage}
				alt={plant.name}
			/>
			<Card.Body>
				<Card.Title>{plant.name}</Card.Title>
				<Card.Text>
					Planted on: {new Date(plant.date_planted).toLocaleDateString()}
				</Card.Text>
				<Button variant="danger" onClick={() => onDelete(plant.id)}>
					Delete
				</Button>
			</Card.Body>
		</Card>
	);
};

PlantCard.propTypes = {
	plant: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		photo: PropTypes.instanceOf(File),
		date_planted: PropTypes.string.isRequired,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default PlantCard;
