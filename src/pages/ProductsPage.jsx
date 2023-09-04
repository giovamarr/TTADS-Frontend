import React from 'react'
import Products from '../components/Products'
import { useParams } from "react-router";
import Navbar from '../components/Navbar'
import { Container } from "react-bootstrap"

const ProductsPage = () => {
  const  categoryId  = useParams();
  return (
    <div>
        <Navbar />
        <Container className="mb-4">

          <Products categoryId={categoryId} />
        </Container>
    </div>
  )
}

export default ProductsPage