import React from 'react'
import { Container } from "react-bootstrap"
import Sales from '../components/Sales.jsx'
import Navbar from '../components/Navbar'


const MySales = () => {
  return (
    <div>
        <Navbar />
        <Container className="mb-4">
            <Sales />
        </Container>
    </div>
  )
}

export default MySales;