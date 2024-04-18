import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert"; // Import Alert component

function ProductImage({ imagFromDB }) {
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL

  useEffect(() => {
    if (!imagFromDB) {
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
    }
  }, [imagFromDB]); // Fetch the image only when imagFromDB changes or is initially empty

  return (
    <Card.Img
      variant="top"
      src={imagFromDB ? imagFromDB : imageUrl}
      style={{ width: "287px", height: "180px", objectFit: "cover" }}
    />
  );
}

export default ProductImage;
