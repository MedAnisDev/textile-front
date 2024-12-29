import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import { downloadFile } from "../service/file/file.js";

function ProductModal({ product, onClose }) {
  const [productImageUrlList, setProductImageUrlList] = useState([]);

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
      console.error("Error loading images in ProductModal:", error);
    }
  };

  useEffect(() => {
    if (product?.id && product.productImages?.length > 0) {
      handleDownloadImages();
    }
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-lg shadow-xl relative max-h-screen overflow-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {product.name || "Unnamed Product"}
        </h2>

        {/* Swiper Carousel */}
        <div className="mb-4">
          {productImageUrlList.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]} // Include modules here
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {productImageUrlList.map((image) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={image.url}
                    alt={product.name || "Product Image"}
                    className="w-full h-full object-contain p-4 rounded-md shadow-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-gray-500">No images available</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700 mb-4">
              {product.description || "No description available"}
            </p>
          </div>
          <div className="flex items-end flex-col">
            <p className="text-gray-800 font-bold text-xl mb-4">
              Price: ${product.price || "N/A"}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
