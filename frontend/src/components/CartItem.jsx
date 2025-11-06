import React from 'react';
import { useCart } from '../contexts/CartContext';

// This component represents one row in the cart
const CartItem = ({ item }) => {
  // Get both remove and update functions from our context
  const { removeFromCart, updateCartQuantity } = useCart();
  
  // We need to check if item.product exists, as it's populated from the DB
  if (!item.product) {
    // This can happen briefly or if data is corrupted
    return null; 
  }
  
  
  const { _id: cartItemId, product, quantity } = item;

  //  Handlers for quantity buttons
  const handleDecrease = () => {
    updateCartQuantity(cartItemId, quantity - 1);
  };

  const handleIncrease = () => {
    updateCartQuantity(cartItemId, quantity + 1);
  };

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">${(product.price * quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)} each</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          
          {/* --- (UPDATED) Quantity Selector --- */}
          <div className="flex items-center rounded border border-gray-200">
            <button
              type="button"
              onClick={handleDecrease}
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-100"
            >
              &minus;
            </button>
            <span className="w-10 text-center text-sm text-gray-700">{quantity}</span>
            <button
              type="button"
              onClick={handleIncrease}
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-100"
            >
              +
            </button>
          </div>
          {/* --- End of Update --- */}

          <div className="flex">
            <button
              type="button"
              onClick={() => removeFromCart(cartItemId)} // We use the cartItemId
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;