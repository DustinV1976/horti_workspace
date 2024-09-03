import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NutrientCard = ({ nutrient }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/nutrients/${nutrient.id}`);
	};

	return (
		<Card
			onClick={handleCardClick}
			style={{
				cursor: "pointer",
				width: "250px",
				borderRadius: "10px",
				overflow: "hidden",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				transition: "transform 0.2s",
			}}
			className="nutrient-card"
		>
			<Card.Body
				style={{
					padding: "20px",
					textAlign: "center",
					backgroundColor: "#f8f9fa",
				}}
			>
				<Card.Title
					style={{
						fontSize: "1.25rem",
						fontWeight: "bold",
						marginBottom: "10px",
					}}
				>
					{nutrient.name}
				</Card.Title>
				<Card.Text>
					Amount: {nutrient.amount} {nutrient.unit}
				</Card.Text>
				<Card.Text>
					N-P-K: {nutrient.nitrogen}-{nutrient.phosphorus}-{nutrient.potassium}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

NutrientCard.propTypes = {
	nutrient: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		amount: PropTypes.number.isRequired,
		unit: PropTypes.string,
		nitrogen: PropTypes.number,
		phosphorus: PropTypes.number,
		potassium: PropTypes.number,
	}).isRequired,
};

export default NutrientCard;
