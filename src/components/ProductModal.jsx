import React from 'react'
import { Button, Modal, Form, Alert } from "react-bootstrap"

const ProductModal = ({show, handleClose, dataProduct, setDataProduct, handleSubmit, error}) => {


    const handleChangeProduct = (e) => {
        const value = e.target.value;
        setDataProduct({
            ...dataProduct,
            [e.target.name]: value,
            },[]);
        };


  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>
            Product
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
                value={dataProduct.title}
                onChange = { handleChangeProduct}
                autoFocus
                required
            />
          </Form.Group>
          <Form.Group className="mb-4">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Descripción"
                  name="description"
                  value={dataProduct.description}
                  onChange = { handleChangeProduct}/>
          </Form.Group>
          <Form.Group className="mb-4">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                  type="number"
                  placeholder="Precio"
                  name="price"
                  value={dataProduct.price}
                  onChange = { handleChangeProduct}/>
          </Form.Group>
          <Form.Group className="mb-4">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Url de Imagen"
                  name="image"
                  value={dataProduct.image}
                  onChange = { handleChangeProduct}/>
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

export default ProductModal;