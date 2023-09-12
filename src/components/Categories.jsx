import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Alert } from "react-bootstrap"
import { addCategory, editCategory, loadCategories, deleteCategory } from "../actions/category.js";
import CategoryItem from './CategoryItem'
import { useAuth } from "../context/AuthContext"
import CategoryModal from './CategoryModal.jsx';

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
    <div className='d-flex justify-content-between'>
      <h3 className='mt-1 mb-3 ms-1'>Categorias</h3>
      { role === 'admin' &&
        <div className='d-flex justify-content-end mb-3'>
          <Button onClick={handleShow} variant='success'>
            + Agregar Categoría</Button>
        </div>
      }
    </div>
    {errorPage && <Alert variant="danger">{errorPage}</Alert>}
      <Row md={2} xs={1} lg={3} className="g-3">
        {categories.map((item) =>(
          <Col key={item._id}>
            <CategoryItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} key={item._id}/>
          </Col>
        ))}
      </Row>

      {/* Modal that opens for adding  */}
        <CategoryModal 
        show={show} 
        handleSubmit={handleSubmit}
        handleClose={handleClose} 
        dataCategory={dataCategory}
        setCategories={setCategories} 
        error={error}
        setDataCategory={setDataCategory}
        setErrorPage={setErrorPage}
        />
      {/* Modal that opens for editing  */}
      <CategoryModal 
        show={showEdit} 
        handleSubmit={handleSubmitEdit}
        handleClose={handleCloseEdit} 
        dataCategory={dataCategoryEdit}
        setCategories={setCategories} 
        error={error}
        setDataCategory={setDataCategoryEdit}
        setErrorPage={setErrorPage}
        />
    </>
    )
}

export default Categories;