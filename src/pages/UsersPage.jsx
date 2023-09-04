import React from 'react'
import { Container } from "react-bootstrap"
import Users from '../components/Users.jsx'
import Navbar from '../components/Navbar.jsx'


const UsersPage = () => {
  return (
    <div>
        <Navbar />
        <Container className="mb-4">
            <Users />
        </Container>
    </div>
  )
}

export default UsersPage;