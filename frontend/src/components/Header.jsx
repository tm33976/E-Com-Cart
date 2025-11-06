import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  // Get the cart count to display in the link
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
        {/* Logo/Home link */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Vibe Commerce
        </Link>

        {/* Cart Link */}
        <Link 
          to="/cart" 
          className="relative rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
          {/* This is the little badge showing the item count */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;