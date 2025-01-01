import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import CategoryFilter from "../components/CategoryFilter";
import { fetchAllProducts } from "../service/product/product.js";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../components/productCard.css";
function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [displayedProducts, setDisplayedProducts] = useState([]);

  const handleFetchAllProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllProducts(1);
      setFilteredProducts(response.products);
      console.log("filteredProducts :",filteredProducts);
      
      setProducts(response.products);

      const allCategories = [
        "All",
        ...new Set(response.products.map((product) => product.category)),
      ];
      setCategories(allCategories);
    } catch (error) {
      setError("Error loading products. Please try again later.");
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const displayNextProduct = () => {

    setTimeout(() => {
      console.log("displayedProducts :",displayedProducts);
      console.log("products :",products);
      console.log("filteredProducts :",filteredProducts);
      

      if (displayedProducts.length < filteredProducts.length) {
        setDisplayedProducts((prev) => [
          ...prev,
          filteredProducts[prev.length],
        ]);
      }

    }, 500);
  }

// Initial fetch of products
  useEffect(() => {
    handleFetchAllProduct();
  }, []);

  useEffect(() => {
    if(filteredProducts.length > displayedProducts.length){
      displayNextProduct();
    }
  }, [displayedProducts, filteredProducts]);


  return (
    <div className="w-full mx-auto ">
      <section className="bg-backgroundSection   relative overflow-hidden w-full h-[90vh] py-16 ">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Style: Performance Meets Fashion
          </h1>
          <p className="text-gray-700 mb-8">
            Explore our curated selection of high-quality athletic apparel
            designed for your active life.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="bg-backgroundproduct p-8">
      
      {/* Category Filter */}
  

      {/* Error Handling */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center my-8">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Display Products */}
          <div className="bg-backgroundproduct product-grid">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No products found in this category.
              </div>
            ) : (
              displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onShowDetails={handleShowDetails}
                />
              ))
            )}
          </div>

          {/* Product Modal */}
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        </>
      )}
      </section>

      <div className="overflow-hidden w-full h-[70vh]  bg-gray-100">

      </div>
    </div>
  );
}

export default Home;
