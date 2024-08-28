import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddPlantForm = ({ show, handleClose, handleAddPlant }) => {
  const [plantData, setPlantData] = useState({
    name: '',
    date_planted: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlant(plantData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Plant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Plant Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={plantData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Planted</Form.Label>
            <Form.Control
              type="date"
              name="date_planted"
              value={plantData.date_planted}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add Plant
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPlantForm;