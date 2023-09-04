import React from "react";
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import { Container } from "react-bootstrap"

const Home = () => {

  return (
    <div>
      <Navbar />
      <Container className="mb-4">
        <Categories />
      </Container>
    </div>
  )
}

export default Home;