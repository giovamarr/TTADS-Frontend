import { useSaleContext } from "../context/SaleContext.jsx"
import { Card, Button, Dropdown } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

  const ProductItem = ({ item, handleDelete, handleEdit }) => {
    const { getSaleProductsQuantity, increaseSaleProductsQuantity, decreaseSaleProductsQuantity } = useSaleContext()
    const quantity = getSaleProductsQuantity(item._id)
    const { role } = useAuth()

    return (
      <Card className="h-100" >
        {/* Dropdown menu for editing or deleting */}
        { role === 'admin' && 

        <div className="d-flex justify-content-end">
        <Dropdown >
          <Dropdown.Toggle variant="primary" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
          </svg>
          {" "}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {handleEdit(item)}}>
            <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
              {" "}
              Editar</Dropdown.Item>
            <Dropdown.Item onClick={() => {handleDelete(item._id)}}>
            <svg className="me-2 mb-1" xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
            {" "}
              Borrar</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </div>
        }
        {item.image ?
          <Card.Img
          variant="top"
          src={item.image}
          height="200px"
          style={{ objectFit: "contain" }}
          />
            :
            <Card.Img
            variant="top"
            src='data:image/jpeg;base64,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'
            height="200px"
            style={{ objectFit: "contain" }}
          />
        }
       
        <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{item.title}</span>
          <span className="ms-2 text-muted">$ {item.price}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseSaleProductsQuantity(item._id, item.title, item.image, item.price)}>
              + Agregar
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
                          <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseSaleProductsQuantity(item._id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                </div>
                <Button onClick={() => increaseSaleProductsQuantity(item._id, item.title, item.image, item.price)}>+</Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
    
    );
  };
  
  export default ProductItem;