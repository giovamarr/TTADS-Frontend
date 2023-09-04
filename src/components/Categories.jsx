import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Modal, Form, Alert } from "react-bootstrap"
import { addCategory, editCategory, loadCategories, deleteCategory } from "../actions/category.js";
import CategoryItem from './CategoryItem'
import { useAuth } from "../context/AuthContext"

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [error, setError] = useState("")
    const [errorPage, setErrorPage] = useState("")
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const [dataCategory, setDataCategory] = useState({ title: "", image: "" });
    const [dataCategoryEdit, setDataCategoryEdit] = useState({ id: "" ,title: "", image: "" });

    const { role } = useAuth()

    async function handleEdit(item) {
      setDataCategoryEdit({ id: item._id ,title: item.title, image: item.image });
      handleShowEdit()
    }

    async function handleDelete(id) {
      const result = await deleteCategory(id);
      const res = await result.json()
      if (!result.ok){
        setErrorPage(res["message"])
      }else{
      loadCategories()
      .then((data) => {
          setCategories(data);
      })
    }}

    async function handleSubmit(e) {
      e.preventDefault()
      setError("")
      const result = await addCategory(dataCategory);
      const res = await result.json()
      if (!result.ok){
        setError(res["message"])
      }else{
      handleClose();
      loadCategories()
        .then((data) => {
            setCategories(data);
            setDataCategory({title: "", image: ""})
        })
        .catch((e) => {
          setErrorPage("No se pudieron cargar las categorias")
        });
      }
    }

      async function handleSubmitEdit(e) {
        e.preventDefault()
        setError("")
        const result = await editCategory(dataCategoryEdit);
        const res = await result.json()
        if (!result.ok){
          setError(res["message"])
        }else{
        handleCloseEdit();
        loadCategories()
          .then((data) => {
              setCategories(data);
              setDataCategoryEdit({title: "", image: ""})
          })
          .catch((e) => {
            setErrorPage("No se pudieron cargar las categorias")
          });
        }}


  const handleChangeCategory = (e) => {
    const value = e.target.value;
    setDataCategory({
        ...dataCategory,
        [e.target.name]: value,
      });
  };

  const handleChangeCategoryEdit = (e) => {
    const value = e.target.value;
    setDataCategoryEdit({
        ...dataCategoryEdit,
        [e.target.name]: value,
      });
  };


    useEffect(() => {
      loadCategories()
        .then((data) => {
          setCategories(data);
        })
        .catch((e) => {
          setErrorPage("No se pudieron cargar las categorias")
        });
    }, []);


  return (
    <>
    { role === 'admin' &&
      <div className='d-flex justify-content-end mb-3'>
        <Button onClick={handleShow} >Agregar Categoria</Button>
      </div>
    }
    {errorPage && <Alert variant="danger">{errorPage}</Alert>}
      <Row md={2} xs={1} lg={3} className="g-3">
        {categories.map((item) =>(
          <Col key={item._id}>
            <CategoryItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} key={item._id}/>
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
                    value={dataCategory.title}
                    onChange = { handleChangeCategory}
                    autoFocus
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
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
                      value={dataCategoryEdit.title}
                      onChange = { handleChangeCategoryEdit}
                      autoFocus
                      required />
              </Form.Group>
              <Form.Group>
                  <Form.Control
                      type="text"
                      placeholder="Url de Imagen"
                      name="image"
                      value={dataCategoryEdit.image}
                      onChange = { handleChangeCategoryEdit} />
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

export default Categories;