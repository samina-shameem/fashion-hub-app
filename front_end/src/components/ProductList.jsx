import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import Alert from 'react-bootstrap/Alert';

function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [connectionError, setConnectionError] = useState(null);

    useEffect(() => {
        // Fetch API to search products content
        fetch(`http://localhost:3000/products?q=${props.keyword}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                // Handle errors such as network errors, server errors
                setConnectionError(`There was a problem connecting with server: ${error.message}`);
            });
    }, [props.keyword]);

  

    return (
        <>
            {connectionError && (
                <Alert variant="danger">
                    <Alert.Heading>{connectionError}</Alert.Heading>
                </Alert>
            )}

            {products.map((product) => (
                <Product key={product.id} item={product} />
            ))}
        </>
    );
}



export default ProductList;
