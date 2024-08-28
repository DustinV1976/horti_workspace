import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const NutrientForm = ({ onSubmit, initialData = {} }) => {
	const [nutrient, setNutrient] = useState({
		name: initialData.name || "",
		description: initialData.description || "",
		amount: initialData.amount || "",
		nitrogen: initialData.nitrogen || "0",
		phosphorus: initialData.phosphorus || "0",
		potassium: initialData.potassium || "0",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNutrient((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(nutrient);
	};

	return (
		<Form>
			<Form.Group>
				<Form.Label>Name*</Form.Label>
				<Form.Control
					type="text"
					name="name"
					value={nutrient.name}
					onChange={handleChange}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					name="description"
					value={nutrient.description}
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Amount (tsp/gallon)*</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="amount"
					value={nutrient.amount}
					onChange={handleChange}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Nitrogen (N)</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="nitrogen"
					value={nutrient.nitrogen}
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Phosphorus (P)</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="phosphorus"
					value={nutrient.phosphorus}
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Potassium (K)</Form.Label>
				<Form.Control
					type="number"
					step="0.1"
					name="potassium"
					value={nutrient.potassium}
					onChange={handleChange}
				/>
			</Form.Group>
			<Button type="submit" onClick={handleSubmit}>
				{initialData.id ? "Update Nutrient" : "Add Nutrient"}
			</Button>
		</Form>
	);
};

NutrientForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	initialData: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
		amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		nitrogen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		phosphorus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		potassium: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
};

export default NutrientForm;
