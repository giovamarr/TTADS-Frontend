import React, { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { login } from "../actions/auth.js";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const { loginUser } = useAuth()
  const history = useNavigate()

  async function handleSubmit(e) {
      e.preventDefault()
      setError("")
      setLoading(true)
      try{
        const result = await login(dataLogin);
        const res = await result.json()
        if (!result.ok){
          setError(res["message"])
        }else{
          loginUser(res["token"])
          history("/")
        }
      }catch{
          setError("Ha ocurrido un error");
        }
      setLoading(false)
  }


  const handleChangeLogin = (e) => {
    const value = e.target.value;
    setDataLogin({
        ...dataLogin,
        [e.target.name]: value,
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center w-100" style={{"min-height" : "80vh", "flex-direction": "column"}}>
      <Card className=" w-50">
        <Card.Body>
          <h2 className="text-center mb-4">
            Ingresar</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Ingresa tu email.."
                  id="email"
                  name="email"
                  onChange={handleChangeLogin}
                  value={dataLogin.email}
                  maxLength={40}
                  autoFocus
                  required
                />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña.."
                  id="password"
                  name="password"
                  onChange={handleChangeLogin}
                  autoComplete="on"
                  value={dataLogin.password}
                  maxLength={30}
                  required
                />        
              </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        No tenés cuenta? <Link to="/register">Registarse</Link>
      </div>
    </Container>
  )
}

export default Login;