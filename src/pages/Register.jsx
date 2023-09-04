import React, { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { register } from "../actions/auth.js";
import { useNavigate } from "react-router-dom"

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
      const result = await register(dataRegister);
      const res = await result.json()
      if (!result.ok){
        setError(res["message"])
      }else{
        history("/login")
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
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Registrarse</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Group id="password">
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
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
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
        Ya tenes cuenta? <Link to="/login">Ingresar</Link>
      </div>
    </>
  )
}

export default Register;