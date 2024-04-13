import React from "react";
import Product from "./Product";
import SearchForm from "./SearchForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
  return (
    <div>
      <SearchForm />
      <Container>
      <Row >        
        <Col><Product /></Col>
        <Col><Product /></Col>
        <Col><Product /></Col>
        <Col><Product /></Col>
        <Col><Product /></Col>
        <Col><Product /></Col>
        <Col><Product /></Col>      
      </Row>
    </Container>
    </div>
  );
}

export default Home;
