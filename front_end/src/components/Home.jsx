import React, { useState } from "react";
import { Button, Container, Row, Col, FormControl } from "react-bootstrap";
import ProductList from "./ProductList";

function Home() {
  const [searchWord, setSearchWord] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearchWord = (event) => {
    const newSearchWord = event.target.value;
    setSearchWord(newSearchWord);
  };

  const handleSearch = () => {
    setKeyword(searchWord);
  };
 
  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md="6">
          <FormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchWord}
            onChange={handleSearchWord}
          />
        </Col>
        <Col md="auto">
          <Button variant="outline-success" onClick={handleSearch}>Search</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <ProductList keyword={keyword} />
      </Row>
    </Container>
  );
}

export default Home;
