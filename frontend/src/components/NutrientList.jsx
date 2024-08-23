import React from "react";
import { ListGroup } from "react-bootstrap";

const NutrientList = ({ nutrients }) => {
	return (
		<ListGroup>
			{nutrients.map((nutrient) => (
				<ListGroup.Item key={nutrient.id}>
					<h4>{nutrient.name}</h4>
					<p>{nutrient.description}</p>
					<p>
						Amount: {nutrient.amount} {nutrient.unit}
					</p>
					<p>
						N-P-K: {nutrient.nitrogen}-{nutrient.phosphorus}-
						{nutrient.potassium}
					</p>
					{nutrient.image && (
						<img
							src={nutrient.image}
							alt={nutrient.name}
							style={{ maxWidth: "100px" }}
						/>
					)}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default NutrientList;
