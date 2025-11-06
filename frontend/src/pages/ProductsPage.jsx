import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL;

const ProductsPage = () => {
  const[products, setProducts] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {
    // This effect runs once when the component mounts
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/products`);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // The empty array [] means this runs only on mount

  // Show loading message
  if (loading) {
    return <div className="text-center p-10">Loading products...</div>;
  }

  // Show error message
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  // Show product grid
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Products</h1>
      {/* This grid is responsive! */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default ProductsPage;