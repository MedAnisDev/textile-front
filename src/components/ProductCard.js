import React, { useState, useEffect } from "react";
import { downloadFile } from "../service/file/file.js";
import "./productCard.css";

const ProductCard = ({ product, onShowDetails }) => {
  const [productImageUrlList, setProductImageUrlList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image

  const handleDownloadImages = async () => {
    try {
      const newImageUrlList = await Promise.all(
        product.productImages.map(async (image) => {
          const imageUrl = await downloadFile(image.name);
          return { id: image.id, url: imageUrl };
        })
      );
      setProductImageUrlList(newImageUrlList);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  useEffect(() => {
    if (product?.id) {
      handleDownloadImages();
    }
  }, [product]);

  const handleImageHover = () => {
    // Change to the next image when hovered
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImageUrlList.length);
  };

  return (
    <div key={product.id} className="product-card">
      {product.id && <div className="sale-tag">Sale</div>}
      <div
        className="relative"
        onMouseEnter={handleImageHover} // Handle hover to switch image
        onMouseLeave={() => setCurrentImageIndex(0)} // Reset to the first image on mouse leave
      >
        <img
          src={productImageUrlList[currentImageIndex]?.url}
          alt={product.name}
          className="product-image transform transition duration-300 ease-in-out cursor-pointer"
        />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price} DT</p>
      <button
        onClick={() => onShowDetails(product)}
        className="mt-4 px-4 py-2 bg-button text-black rounded-md hover:bg-opacity-80  transition duration-200"
      >
        Show More
      </button>
    </div>
  );
};

export default ProductCard;
