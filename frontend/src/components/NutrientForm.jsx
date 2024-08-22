import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NutrientForm = ({ onSubmit }) => {
  const [nutrient, setNutrient] = useState({
    name: '',
    description: '',
    amount: '',
    unit: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNutrient(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNutrient(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in nutrient) {
      if (nutrient[key] !== null && nutrient[key] !== '') {
        formData.append(key, nutrient[key]);
      }
    }
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={nutrient.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" value={nutrient.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name="amount" value={nutrient.amount} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Unit</Form.Label>
        <Form.Control type="text" name="unit" value={nutrient.unit} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Nitrogen (N)</Form.Label>
        <Form.Control type="number" name="nitrogen" value={nutrient.nitrogen} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phosphorus (P)</Form.Label>
        <Form.Control type="number" name="phosphorus" value={nutrient.phosphorus} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Potassium (K)</Form.Label>
        <Form.Control type="number" name="potassium" value={nutrient.potassium} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleImageChange} />
      </Form.Group>
      <Button type="submit">Add Nutrient</Button>
    </Form>
  );
};

export default NutrientForm;