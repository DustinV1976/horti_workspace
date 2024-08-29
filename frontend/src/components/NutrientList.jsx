import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NutrientList = ({ nutrients, onEdit }) => {
	return (
		<ListGroup>
			{nutrients.map((nutrient) => (
				<ListGroup.Item key={nutrient.id}>
					<h4>
						<Link to={`/nutrients/${nutrient.id}`}>{nutrient.name}</Link>
					</h4>
					<p>{nutrient.description}</p>
					<p>
						Amount: {nutrient.amount} {nutrient.unit}
					</p>
					<p>
						N-P-K: {nutrient.nitrogen}-{nutrient.phosphorus}-
						{nutrient.potassium}
					</p>
					<Button onClick={() => onEdit(nutrient)}>Edit</Button>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default NutrientList;
