import React from 'react'
import { Card  } from "react-bootstrap"

const SaleItem = ({sale}) => {
    const date = new Date(sale.date)
    return (
    
    <Card className="h-100" >
    <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span>Total: ${sale.totalPrice} </span>
            <span>Fecha: {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}hs`}</span>
        </Card.Title>
        Productos comprados:
            { sale.products.map((e)  => (
                <div className='d-flex justify-content-center'>
                    <span className="fs-5">{e.quantity}</span>
                    <span className="fs-5"> {e.product?.title} </span>
                    <span className="fs-5"> ($ {e.price} )</span>
                </div>
            ))
            }
    </Card.Body>
    </Card>

    )
}

export default SaleItem