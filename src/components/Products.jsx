import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { addProduct, editProduct, deleteProduct, loadProductsByCategory } from '../actions/product.js';
import { Col, Row, Button, Modal, Form, Alert } from "react-bootstrap"
import { useSaleContext } from '../context/SaleContext.jsx';
import { useAuth } from "../context/AuthContext"

const Products = ({categoryId}) => {
    const { removeProductFromSale } = useSaleContext()
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [error, setError] = useState("")
    const [errorPage, setErrorPage] = useState("")
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    const [dataProduct, setDataProduct] = useState({ category: categoryId['categorId'], title: "", description: "", price: "", image: "" });
    const [dataProductEdit, setDataProductEdit] = useState({ id: "", category: categoryId['categorId'], title: "", description: "", price: "", image: "" });
    const { role } = useAuth()


    async function handleEdit(item) {
      setDataProductEdit({ id: item._id ,title: item.title, image: item.image, description: item.description, price: item.price });
      handleShowEdit()
    }

    async function handleDelete(id) {
      const result = await deleteProduct(id);
      const res = await result.json()
      if (!result.ok){
        setErrorPage(res["message"])
      }else{
      removeProductFromSale(id);
      loadProductsByCategory(categoryId['categorId'])
        .then((data) => {
        setProducts(data);
      })
    }}

    async function handleSubmit(e) {
      e.preventDefault()
      setError("")
      const result = await addProduct(dataProduct);
      const res = await result.json()
      if (!result.ok){
        setError(res["message"])
      }else{
      handleClose();
        loadProductsByCategory(categoryId['categorId'])
          .then((data) => {
              setProducts(data);
              setDataProduct({ category: categoryId['categorId'], title: "", description: "", price: "", image: "" })
          })
          .catch((e) => {
            setErrorPage("No se pudieron cargar los productos")
          });
      }}

  async function handleSubmitEdit(e) {
        e.preventDefault()
        setError("")
        const result = await editProduct(dataProductEdit);
        const res = await result.json()
        if (!result.ok){
          setError(res["message"])
        }else{
        handleCloseEdit();
        loadProductsByCategory(categoryId['categorId'])
          .then((data) => {
              setProducts(data);
              setDataProductEdit({category: categoryId['categorId'], title: "", description: "", price: "", image: ""})
          })
          .catch((e) => {
            setErrorPage("No se pudieron cargar los productos")
          });
        }}


  const handleChangeProduct = (e) => {
    const value = e.target.value;
    setDataProduct({
        ...dataProduct,
        [e.target.name]: value,
      },[]);
  };

  const handleChangeProductEdit = (e) => {
    const value = e.target.value;
    setDataProductEdit({
        ...dataProductEdit,
        [e.target.name]: value,
      });
  };


    useEffect(() => {
        loadProductsByCategory(categoryId['categorId'])
          .then((data) => {
            setProducts(data);
          })
          .catch((e) => {
            setErrorPage("No se pudieron cargar los productos")
          });
      }, [categoryId]);
    
  return (
    <>
    { role === 'admin' && 
    <div className='d-flex justify-content-end mb-3'>
      <Button onClick={handleShow} >Agregar Producto</Button>
    </div>
}
    {errorPage && <Alert variant="danger">{errorPage}</Alert>}
      <Row md={2} xs={1} lg={3} className="g-3">
          {products.map((item) =>(
            <Col key={item._id}>
              <ProductItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} key={item._id}/>
            </Col>
          ))}
      </Row>

      {/* Modal that opens for adding  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Agregar
            </Modal.Title>
        </Modal.Header>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
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
              <Form.Group>
                  <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      name="description"
                      value={dataProduct.description}
                      onChange = { handleChangeProduct}/>
              </Form.Group>
              <Form.Group>
                  <Form.Control
                      type="number"
                      placeholder="Precio"
                      name="price"
                      value={dataProduct.price}
                      onChange = { handleChangeProduct}/>
              </Form.Group>
              <Form.Group>
                  <Form.Control
                      type="text"
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
      
      {/* Modal that opens for editing  */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
            <Modal.Title>
                Editar
            </Modal.Title>
        </Modal.Header>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmitEdit}>
            <Modal.Body>
              <Form.Group>
                  <Form.Control
                      type="text"
                      placeholder="Titulo"
                      name="title"
                      value={dataProductEdit.title}
                      onChange = { handleChangeProductEdit}
                      autoFocus
                      required/>
              </Form.Group>
              <Form.Group>
                  <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      name="description"
                      value={dataProductEdit.description}
                      onChange = { handleChangeProductEdit}/>
              </Form.Group>
              <Form.Group>
                  <Form.Control
                      type="text"
                      placeholder="Precio"
                      name="price"
                      value={dataProductEdit.price}
                      onChange = { handleChangeProductEdit}/>
              </Form.Group>

              <Form.Group>
                  <Form.Control
                      type="text"
                      placeholder="Url de Imagen"
                      name="image"
                      value={dataProductEdit.image}
                      onChange = { handleChangeProductEdit}/>
              </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
              Cancelar
          </Button>
          <Button variant="success" type="submit" block>
              Confirmar
          </Button>
        </Modal.Footer>
      </Form>
      </Modal>

    </>
    )
}

export default Products;