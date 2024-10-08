import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/plants/${plant.id}`);
	};

	const defaultImage = "/images/horti_logo.WEBP";

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
			className="plant-card"
		>
			<Card.Img
				variant="top"
				src={plant.image || defaultImage}
				style={{
					height: "250px",
					objectFit: "cover",
				}}
			/>
			<Card.Body
				style={{
					padding: "10px",
					textAlign: "center",
					backgroundColor: "#f8f9fa",
				}}
			>
				<Card.Title
					style={{
						fontSize: "1.25rem",
						fontWeight: "bold",
						marginBottom: "5px",
					}}
				>
					{plant.name}
				</Card.Title>
				<Card.Text style={{ color: "#6c757d" }}>
					Planted: {plant.date_planted}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

PlantCard.propTypes = {
	plant: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string,
		date_planted: PropTypes.string.isRequired,
	}).isRequired,
};

export default PlantCard;
