import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert"; // Import Alert component

function ProductImage() {
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL

  useEffect(() => {
    // Fetch a random image from "https://picsum.photos/640/360"
    fetch("https://picsum.photos/640/360")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.url;
      })
      .then((url) => {
        setImageUrl(url); // Set the fetched image URL in state
      })
      .catch((error) => {
        console.error("Error fetching image:", error.message);
      });
  }, []); // Fetch the image only once when the component mounts

  return (
    <Card.Img variant="top" src={imageUrl} /> // Use the fetched image URL
  );
}

export default ProductImage;