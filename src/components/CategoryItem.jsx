import { Link } from "react-router-dom";
import { Card, Dropdown } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import '../assets/css/styles.css'
import defaultImg from '../assets/images/not-image.jpg'
import { AiFillSetting, AiOutlineDelete } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";

  const CategoryItem = ({ item , handleDelete, handleEdit} ) => {
    const { role } = useAuth()

    return (
      <Card className="h-100 mb-5 card-shadow" >
        {/* Dropdown menu for editing or deleting */}
        <div className="d-flex justify-content-between">
        <h4 className="fs-2 mt-1 text-center ms-3">{item.title}</h4>

        <div className="d-flex justify-content-end">
      { role === 'admin' && 
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
        }
        </div>
       </div>

        <Link to={"/products/" + item._id}>
        {item.image ?
          <Card.Img
          className="image-contain"
          variant="top"
          src={item.image}
          height="200px"
          />
            :
            <Card.Img
            variant="top"
            src={defaultImg}
            height="200px"
            className="image-contain"
            />
        }
        </Link>
    </Card>
    
    );
  };
  
  export default CategoryItem;