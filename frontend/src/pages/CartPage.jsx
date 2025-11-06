import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CheckoutModal from '../components/CheckoutModal';

const CartPage = () => {
  // Get everything we need from the cart context
  const { cartItems, cartTotal, loading, checkout } = useCart();
  
  // State for our checkout form
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  // State to control the checkout receipt modal
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  
  // Handle text changes in the form
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle the form submission
  const handleCheckout = async (e) => {
    e.preventDefault(); // Stop the form from reloading the page
    setIsCheckingOut(true);
    try {
      // Call the checkout function from our context
      const checkoutReceipt = await checkout(userInfo);
      setReceipt(checkoutReceipt); // Save the receipt
      setShowModal(true); // Show the modal
      setUserInfo({ name: '', email: '' }); // Clear the form
    } catch (error) {
      // The context already showed a toast error, so we just log it
      console.error('Checkout failed', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Show a loading spinner if the cart is loading
  if (loading) {
    return <div className="text-center p-10">Loading cart...</div>;
  }

  // Show a message if the cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  // If we have items, show the cart and checkout form
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>
      {/* We use a responsive grid for the cart and checkout form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Cart Items List */}
        <div className="lg:col-span-2">
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2: Order Summary & Checkout Form */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-md border border-gray-200 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
            </div>

            <hr className="my-6" />

            {/* Checkout Form */}
            <form onSubmit={handleCheckout}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Checkout</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isCheckingOut}
                className="mt-6 w-full flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isCheckingOut ? 'Processing...' : 'Mock Checkout'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* The Receipt Modal */}
      {showModal && receipt && (
        <CheckoutModal 
          receipt={receipt} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default CartPage;