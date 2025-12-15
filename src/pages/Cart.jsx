import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-gray-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Keranjang Belanja Kosong
          </h2>
          <p className="text-gray-500 mb-8">
            Tambahkan beberapa produk ke keranjang Anda dan mulai berbelanja
          </p>
          <Link
            to="/products"
            className="inline-flex items-center btn-primary"
          >
            Mulai Berbelanja
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
  if (cartItems.length === 0) {
    alert('Keranjang Anda kosong. Tambahkan produk terlebih dahulu.');
    return;
  }
  
  // Navigate ke checkout
  navigate('/checkout');
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-secondary mb-8">Keranjang Belanja</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {/* Cart Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-semibold">
              {cartItems.length} Produk di Keranjang
            </div>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-sm text-danger hover:text-red-700"
            >
              Hapus Semua
            </button>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-accent p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="md:w-32">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-secondary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary mb-2">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-gray-500">
                          Rp {item.price.toLocaleString('id-ID')} / item
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-accent rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 hover:bg-accent"
                          >
                            <FiMinus />
                          </button>
                          <span className="px-4 py-2 border-x border-accent">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:bg-accent"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          Stok: {item.stock}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center text-danger hover:text-red-700"
                      >
                        <FiTrash2 className="mr-2" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center text-primary hover:text-primary-dark"
            >
              ← Lanjutkan Berbelanja
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-accent p-6 sticky top-24">
            <h3 className="text-xl font-bold text-secondary mb-6">
              Ringkasan Belanja
            </h3>

            {/* Order Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Biaya Pengiriman</span>
                <span className="text-success">Gratis</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Biaya Layanan</span>
                <span>Rp 2.000</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    Rp {(cartTotal + 2000).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center"
            >
              Lanjut ke Pembayaran
              <FiArrowRight className="ml-2" />
            </button>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">
                Metode Pembayaran
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {['BCA', 'Mandiri', 'BNI', 'BRI', 'OVO', 'Gopay'].map((method) => (
                  <div
                    key={method}
                    className="border border-accent rounded-lg p-3 text-center hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-sm">{method}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-secondary mb-4">
              Hapus Semua Item?
            </h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus semua item dari keranjang belanja?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-6 py-2 border border-accent rounded-lg text-gray-600 hover:bg-accent transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="px-6 py-2 bg-danger text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;