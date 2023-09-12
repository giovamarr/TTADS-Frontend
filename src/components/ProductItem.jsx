import { useSaleContext } from "../context/SaleContext.jsx"
import { Card, Button, Dropdown } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import '../assets/css/styles.css'
import defaultImg from '../assets/images/not-image.jpg'
import { AiFillSetting, AiOutlineDelete } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";

  const ProductItem = ({ item, handleDelete, handleEdit }) => {
    const { getSaleProductsQuantity, increaseSaleProductsQuantity, decreaseSaleProductsQuantity } = useSaleContext()
    const quantity = getSaleProductsQuantity(item._id)
    const { role } = useAuth()

    return (
      <Card className="h-100 card-shadow" >
        {/* Dropdown menu for editing or deleting */}
        { role === 'admin' && 

        <div className="d-flex justify-content-end">
        <Dropdown >
          <Dropdown.Toggle variant="outline-danger" >
          < AiFillSetting />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {handleEdit(item)}}>
            < VscEdit />
              {" "}
              Editar</Dropdown.Item>
            <Dropdown.Item onClick={() => {handleDelete(item._id)}}>
            < AiOutlineDelete />
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
          className="image-contain"
          />
            :
            <Card.Img
            variant="top"
            src={defaultImg}
            height="200px"
            className="image-contain"
            />
        }
       
        <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
          <h4 className="fs-2 mt-1 text-center">{item.title}</h4>
          <span className="ms-2 text-muted">$ {item.price}</span>
        </Card.Title>
        <span className="mb-3 text-muted">{item.description}</span>
        <div className="mt-auto mb-1">
          {quantity === 0 ? (
            <Button className="w-100" variant="outline-primary" onClick={() => increaseSaleProductsQuantity(item._id, item.title, item.image, item.price)}>
              + Agregar
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column gap"
            >
            <div
                className="d-flex align-items-center justify-content-center gap"
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