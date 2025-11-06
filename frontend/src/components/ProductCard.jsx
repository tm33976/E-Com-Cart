import React from 'react';
import { useCart } from '../contexts/CartContext';

// This component receives a 'product' object as a prop
const ProductCard = ({ product }) => {
  // We get the addToCart function from our context
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // We add 1 quantity of this product
    addToCart(product, 1);
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-contain p-4" 
          src={product.image}
          alt={product.name}
        />
      </div>
      
      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-gray-500 line-clamp-3">
            {product.description}
          </p>
        </div>
        
        {/* Price and Add to Cart Button */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;