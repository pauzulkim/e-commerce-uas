import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          {/* Gunakan container system yang konsisten */}
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header biasanya full width */}
            <Header />
            
            {/* Main content dengan responsive container */}
            <main className="flex-grow w-full">
              <div className="responsive-container mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
            
            <Footer />
            
            {/* Toast Notification */}
            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;