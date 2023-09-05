import React from 'react'
import { Card  } from "react-bootstrap"

const SaleItem = ({sale}) => {
    const date = new Date(sale.date)
    return (
    <div className='d-flex justify-content-center'>

    <Card className="h-100 w-75 " >
    <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <h5><b>Total:</b> ${sale.totalPrice} </h5>
            <h5><b>Fecha:</b> {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}hs`}</h5>
        </Card.Title>
            { sale.products.map((e)  => (
                <div className='d-flex justify-content-evenly'>
                    <p className=""><b>Producto</b>: {e.product?.title}  </p>
                    <p> <b>Cantidad:</b> {e.quantity}</p>
                    <p>Precio: $ {e.price}</p>
                </div>
            ))
            }
    </Card.Body>
    </Card>
    </div>

    )
}

export default SaleItem