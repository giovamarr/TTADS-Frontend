import React, {useState} from 'react'
import { Button, Alert } from 'react-bootstrap'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useSaleContext } from '../context/SaleContext.jsx'
import { createSale } from '../actions/sale.js'

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
              <img alt='Imagen del producto' src={item.image}  style={{ width: "125px", height: "75px", objectFit: "cover", border:"1px solid #caccce"}} />
              :
              <img alt='Imagen del producto' src="data:image/jpeg;base64,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"
                style={{ width: "125px", height: "75px", objectFit: "cover", border:"1px solid #caccce"}} />
            }
            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
              <b>{item.title}{" "}$ {item.price}</b> 
              <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                <Button onClick={() => decreaseSaleProductsQuantity(item.id)}>-</Button>
                <div>
                  <span className="fs-3">{item.quantity}</span>
                </div>
                <Button onClick={() => increaseSaleProductsQuantity(item.id)}>+</Button>
                <div>
                  $ {item.price * item.quantity}
                </div>
                <Button onClick={() => removeProductFromSale(item.id)}>
                  Borrar
                </Button>

              </div>
            </div>
          </Stack>
          ))}
          {saleProducts.length > 0 &&          
          <Button className="w-100 mt-4" onClick={() => handleSubmit()}>
              Comprar
          </Button>
          }
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>  )
}

export default OrderSideBar