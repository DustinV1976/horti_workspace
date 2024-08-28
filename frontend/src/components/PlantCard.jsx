import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/plant/${plant.id}`);
	};

	const defaultImage = "/images/tree_book1.jpg"; // Path to the default image

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

export default PlantCard;
