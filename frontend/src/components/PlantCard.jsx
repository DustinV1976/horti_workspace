import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant, onDelete }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/plant/${plant.id}`);
	};

	return (
		<Card onClick={handleCardClick} style={{ cursor: "pointer" }}>
			<Card.Body>
				<Card.Title>{plant.name}</Card.Title>
				<Card.Text>
					Planted on: {new Date(plant.date_planted).toLocaleDateString()}
				</Card.Text>
				<Button
					variant="danger"
					onClick={(e) => {
						e.stopPropagation();
						onDelete(plant.id);
					}}
				>
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
		date_planted: PropTypes.string.isRequired,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default PlantCard;
