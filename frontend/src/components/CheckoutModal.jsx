import React from 'react';

// This is the modal that pops up after a successful checkout
const CheckoutModal = ({ receipt, onClose }) => {
  return (
    // This is the backdrop/overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* This is the modal content */}
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          &times; {/* This is an 'X' */}
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Checkout Successful!</h2>
          <p className="mt-2 text-gray-600">
            Thank you for your "purchase," <strong>{receipt.user.name}</strong>!
          </p>
          
          <div className="mt-6 space-y-2 text-left bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800">Mock Receipt Details</h3>
            <p className="text-sm text-gray-700">
              <strong>Receipt ID:</strong> {receipt.receiptId}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {receipt.user.email}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2">
              <strong>Total Paid:</strong> ${receipt.total.toFixed(2)}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;