import React, { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { register } from "../actions/auth.js";
import { useNavigate } from "react-router-dom"
import '../assets/css/styles.css'

const Register = () => {
//   const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [dataRegister, setDataRegister] = useState({ name:"", email: "", password: "" });
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try{
      const result = await register(dataRegister);
      const res = await result.json()
      if (!result.ok){
        setError(res["message"])
      }else{
        history("/login")
      }
    }catch{
      setError("Ha ocurrido un error")
    }
  setLoading(false)
}


  const handleChangeRegister = (e) => {
    const value = e.target.value;
    setDataRegister({
        ...dataRegister,
        [e.target.name]: value,
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center w-100 auth-container">
      <Card className=" w-50">
        <Card.Body>
          <h2 className="text-center mb-4">Registrarse</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre.."
                  id="name"
                  name="name"
                  onChange={handleChangeRegister}
                  value={dataRegister.name}
                  maxLength={45}
                  required/>        
              </Form.Group>
              <Form.Group id="password" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Ingresa tu email.."
                  id="email"
                  name="email"
                  onChange={handleChangeRegister}
                  value={dataRegister.email}
                  maxLength={40}
                  autoFocus
                  required/>
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña.."
                  id="password"
                  name="password"
                  onChange={handleChangeRegister}
                  autoComplete="on"
                  value={dataRegister.password}
                  maxLength={30}
                  required/>        
              </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Confirmar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Ya tenés cuenta? <Link to="/login">Ingresar</Link>
      </div>
    </Container>
  )
}

export default Register;