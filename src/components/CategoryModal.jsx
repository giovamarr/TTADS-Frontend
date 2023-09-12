import React from 'react'
import { Button, Modal, Form, Alert } from "react-bootstrap"

const CategoryModal = ({show, handleClose, dataCategory, setDataCategory, handleSubmit, error }) => {

  const handleChangeCategory = (e) => {
    const value = e.target.value;
    setDataCategory({
        ...dataCategory,
        [e.target.name]: value,
      });
  };

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Categoria
            </Modal.Title>
        </Modal.Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-4">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Titulo"
                    name="title"
                    value={dataCategory.title}
                    onChange = { handleChangeCategory}
                    autoFocus
                    required/>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Url de Imagen"
                    name="image"
                    value={dataCategory.image}
                    onChange = { handleChangeCategory} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancelar
            </Button>
            <Button variant="success" type="submit" block>
                Agregar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
  )
}

export default CategoryModal;