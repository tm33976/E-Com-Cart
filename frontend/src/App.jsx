import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="App">
      {/* This component shows all the pop-up notifications */}
      <Toaster position="bottom-center" />
      
      {/* The Header is on every page */}
      <Header />

      {/* Main content area */}
      <main className="container mx-auto p-4 max-w-7xl">
        <Routes>
          {/* The home page is our products grid */}
          <Route path="/" element={<ProductsPage />} />
          
          {/* The cart page */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;