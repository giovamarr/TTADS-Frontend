import React, { useEffect, useState } from 'react'
import { Col, Row, Alert } from "react-bootstrap"
import { loadSalesUser } from '../actions/sale.js';
import SaleItem from './SaleItem.jsx'

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [errorPage, setErrorPage] = useState("")
    
    useEffect(() => {
        loadSalesUser()
        .then((data) => {
            setSales(data);
        })
        .catch((e) => {
          setErrorPage("No se pudieron cargar las ventas")
        });
    }, []);

  return (
    <div>
        <Row md={1} xs={1} lg={1} className="g-4">
        {errorPage && <Alert variant="danger">{errorPage}</Alert>}
        {sales.map((sale) =>(
          <Col key={sale._id}>
            <SaleItem sale={sale} key={sale._id}/>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Sales