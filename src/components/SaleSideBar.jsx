import React, {useState} from 'react'
import { Button, Alert } from 'react-bootstrap'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useSaleContext } from '../context/SaleContext.jsx'
import { createSale } from '../actions/sale.js'
import defaultImg from '../assets/images/not-image.jpg'

const OrderSideBar = ({isOpen }) => {
    const { closeSideBar, saleProducts, increaseSaleProductsQuantity, decreaseSaleProductsQuantity, removeProductFromSale, removeAllProductsFromSale } = useSaleContext()
    const [error, setError] = useState("")

    async function handleSubmit() {
      setError("")
      const result = await createSale(saleProducts);
      const res = await result.json()
      if (!result.ok){
        setError(res["message"])
      }else{
        removeAllProductsFromSale()
        closeSideBar()
      }
    }

  return (
    <Offcanvas show={isOpen} onHide={closeSideBar} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Comprar</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Stack gap={3}>
          {saleProducts.map(item => (
          <Stack direction="horizontal" gap={4} className="d-flex align-items-center">
            { item.image ?
              <img alt='Imagen del producto' src={item.image} className='sale-side-bar-image' />
              :
              <img alt='Imagen del producto' src={defaultImg} className='sale-side-bar-image' />
            }
            <div className="d-flex align-items-center flex-column gap">
              <b>{item.title}{" "}$ {item.price}</b> 
              <div className="d-flex align-items-center justify-content-center gap">
                <Button className='btn-sm' onClick={() => decreaseSaleProductsQuantity(item.id)}>-</Button>
                <div>
                  <span className="fs-3">{item.quantity}</span>
                </div>
                <Button className='btn-sm' onClick={() => increaseSaleProductsQuantity(item.id)}>+</Button>
                <div>
                  $ {item.price * item.quantity}
                </div>
                <Button className='btn-danger btn-sm' onClick={() => removeProductFromSale(item.id)}>
                  X
                </Button>

              </div>
            </div>
          </Stack>
          ))}
          {saleProducts.length > 0 &&
          <Button className="btn-success w-100 mt-4" onClick={() => handleSubmit()}>
              Comprar
          </Button>
          }
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>  )
}

export default OrderSideBar