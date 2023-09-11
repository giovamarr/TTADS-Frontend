import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { addProduct, editProduct, deleteProduct, loadProductsByCategory } from '../actions/product.js';
import { Col, Row, Button, Alert } from "react-bootstrap"
import { useSaleContext } from '../context/SaleContext.jsx';
import { useAuth } from "../context/AuthContext"
import ProductModal from './ProductModal.jsx';

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
      <div className='d-flex justify-content-between'>
        <h3 className='mt-1 mb-3 ms-1'>Productos</h3>

        { role === 'admin' && 
        <div className='d-flex justify-content-end mb-3'>
          <Button variant='success' onClick={handleShow} >+ Agregar Producto</Button>
        </div>
        }
      </div>

    {errorPage && <Alert variant="danger">{errorPage}</Alert>}
      <Row md={2} xs={1} lg={3} className="g-3">
          {products.map((item) =>(
            <Col key={item._id}>
              <ProductItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} key={item._id}/>
            </Col>
          ))}
      </Row>

      {/* Modal that opens for adding  */}
          <ProductModal 
          show={show} 
          handleSubmit={handleSubmit}
          handleClose={handleClose} 
          dataProduct={dataProduct}
          setProducts={setProducts} 
          error={error}
          setDataProduct={setDataProduct}
          setErrorPage={setErrorPage}
          />
      {/* Modal that opens for editing  */}
      <ProductModal 
          show={showEdit} 
          handleSubmit={handleSubmitEdit}
          handleClose={handleCloseEdit} 
          dataProduct={dataProductEdit}
          setProducts={setProducts} 
          error={error}
          setDataProduct={setDataProductEdit}
          setErrorPage={setErrorPage}
          />
    </>
    )
}

export default Products;