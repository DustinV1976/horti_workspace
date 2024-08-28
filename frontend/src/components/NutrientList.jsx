import React from "react";
import { ListGroup, Image, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const NutrientList = ({ nutrients, onEdit }) => {
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
						<Image
							src={nutrient.image}
							alt={nutrient.name}
							style={{ maxWidth: "100px" }}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = "./media/nutrient_images/";
							}}
						/>
					)}
					<Button onClick={() => onEdit(nutrient)}>Edit</Button>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

NutrientList.propTypes = {
	nutrients: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			nitrogen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			phosphorus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			potassium: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			image: PropTypes.string, // URL to the image
			unit: PropTypes.string,
		})
	).isRequired,
	onEdit: PropTypes.func.isRequired,
};

export default NutrientList;
