import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiCreditCard, FiTruck, FiCheck, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // ✅ HAPUS SEMUA useEffect - TIDAK PERLU!

  const generateOrderId = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const paymentMethods = [
    { id: 'bca', name: 'BCA Virtual Account', icon: '🏦' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '🏦' },
    { id: 'bni', name: 'BNI Virtual Account', icon: '🏦' },
    { id: 'ovo', name: 'OVO', icon: '📱' },
    { id: 'gopay', name: 'GoPay', icon: '📱' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🛍️' },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    
    // Simulate payment process
    setStep(2);
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    
    // Prepare order data
    const orderData = {
      id: newOrderId,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      total: cartTotal + 2000,
      status: 'Diproses',
      paymentMethod: paymentMethods.find(m => m.id === paymentMethod)?.name || 'Transfer Bank',
      estimatedDelivery: '2-3 hari kerja',
      shippingInfo: {
        ...data,
        courier: data.courier || 'JNE Regular'
      },
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }))
    };
    
    // Simulasi proses pembayaran 3 detik
    setTimeout(() => {
      // Hapus cart items
      clearCart();
      setLoading(false);
      
      // LANGSUNG KE CONFIRMATION - TIDAK REDIRECT KE MANA-MANA
      navigate('/confirmation', { 
        state: { orderData },
        replace: true // Biar ga bisa back ke checkout
      });
    }, 3000);
  };

  const steps = [
    { number: 1, title: 'Informasi Pengiriman', icon: <FiTruck /> },
    { number: 2, title: 'Pembayaran', icon: <FiCreditCard /> },
    { number: 3, title: 'Konfirmasi', icon: <FiCheck /> },
  ];

  // ✅ Cek cart kosong DI AWAL - sederhana saja
  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Keranjang Kosong
          </h2>
          <p className="text-gray-500 mb-8">
            Silakan tambahkan produk ke keranjang terlebih dahulu.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Belanja Sekarang
          </button>
        </div>
      </div>
    );
  }

  // ✅ Loading state hanya untuk proses pembayaran
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memproses pembayaran Anda...</p>
          <p className="text-sm text-gray-500 mt-2">Harap tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-6 md:mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between overflow-x-auto pb-2 no-scrollbar">
          {steps.map((stepItem, index) => (
            <div key={stepItem.number} className="flex flex-col items-center min-w-[80px] md:min-w-0">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base ${
                step >= stepItem.number ? 'bg-primary text-white' : 'bg-accent text-gray-400'
              }`}>
                {stepItem.icon}
              </div>
              <div className="mt-2 text-center">
                <div className={`font-medium text-xs md:text-sm whitespace-nowrap ${
                  step >= stepItem.number ? 'text-secondary' : 'text-gray-400'
                }`}>
                  {stepItem.title.split(' ')[0]}
                </div>
                <div className="hidden md:block text-xs text-gray-500 mt-1">
                  {stepItem.title.split(' ').slice(1).join(' ')}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden md:block h-1 w-16 mx-4 ${
                  step > stepItem.number ? 'bg-primary' : 'bg-accent'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Form Section */}
        <div className="lg:w-2/3">
          {step === 1 ? (
            <form onSubmit={handleSubmit(() => setStep(2))}>
              <div className="bg-white rounded-xl shadow-sm border border-accent p-4 md:p-6 mb-6">
                <h2 className="text-lg md:text-xl font-bold text-secondary mb-4 md:mb-6">
                  Informasi Pengiriman
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      {...register('fullName', { required: 'Nama lengkap diperlukan' })}
                      className="input-field"
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.fullName && (
                      <p className="text-danger text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email diperlukan',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Format email tidak valid'
                        }
                      })}
                      className="input-field"
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-danger text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. Telepon *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { 
                        required: 'No. telepon diperlukan',
                        pattern: {
                          value: /^[0-9]{10,13}$/,
                          message: 'Format telepon tidak valid'
                        }
                      })}
                      className="input-field"
                      placeholder="081234567890"
                    />
                    {errors.phone && (
                      <p className="text-danger text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kota *
                    </label>
                    <select
                      {...register('city', { required: 'Kota diperlukan' })}
                      className="input-field"
                    >
                      <option value="">Pilih Kota</option>
                      <option value="jakarta">Jakarta</option>
                      <option value="bandung">Bandung</option>
                      <option value="surabaya">Surabaya</option>
                      <option value="medan">Medan</option>
                      <option value="semarang">Semarang</option>
                    </select>
                    {errors.city && (
                      <p className="text-danger text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap *
                    </label>
                    <textarea
                      {...register('address', { 
                        required: 'Alamat diperlukan',
                        minLength: {
                          value: 10,
                          message: 'Alamat minimal 10 karakter'
                        }
                      })}
                      className="input-field"
                      rows="4"
                      placeholder="Masukkan alamat lengkap"
                    />
                    {errors.address && (
                      <p className="text-danger text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      {...register('postalCode')}
                      className="input-field"
                      placeholder="12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kurir Pengiriman *
                    </label>
                    <select
                      {...register('courier', { required: 'Kurir diperlukan' })}
                      className="input-field"
                    >
                      <option value="">Pilih Kurir</option>
                      <option value="jne">JNE Regular</option>
                      <option value="tiki">TIKI Regular</option>
                      <option value="pos">POS Indonesia</option>
                      <option value="sicepat">SiCepat</option>
                    </select>
                    {errors.courier && (
                      <p className="text-danger text-sm mt-1">{errors.courier.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary px-6 md:px-8 py-3 text-sm md:text-base"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </form>
          ) : step === 2 ? (
            <div className="bg-white rounded-xl shadow-sm border border-accent p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-secondary mb-4 md:mb-6">
                Pilih Metode Pembayaran
              </h2>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary bg-opacity-5'
                        : 'border-accent hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3 md:mr-4">{method.icon}</span>
                        <div>
                          <div className="font-medium text-sm md:text-base">{method.name}</div>
                          <div className="text-xs md:text-sm text-gray-500">
                            {method.id.includes('va') ? 'Transfer Virtual Account' : 'E-Wallet'}
                          </div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {paymentMethod && (
                <div className="bg-accent rounded-lg p-4 md:p-6 mb-6">
                  <div className="flex items-center text-primary mb-3 md:mb-4">
                    <FiLock className="mr-2" />
                    <span className="font-medium">Pembayaran Aman</span>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    Setelah Anda mengklik "Bayar Sekarang", Anda akan diarahkan ke halaman pembayaran yang aman.
                  </p>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full btn-primary py-3 md:py-4 text-base md:text-lg font-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Memproses...' : 'Bayar Sekarang'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-accent p-4 md:p-6 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-success bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <FiCheck className="text-success" size={30} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-secondary mb-3 md:mb-4">
                Memproses Pembayaran...
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                Mohon tunggu sebentar. Pesanan Anda sedang diproses.
              </p>
              <div className="w-full bg-accent rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-4">Order ID: {orderId}</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-accent p-4 md:p-6 sticky top-24">
            <div className="flex items-center mb-4 md:mb-6">
              <FiShoppingBag className="text-primary mr-2" />
              <h3 className="text-lg md:text-xl font-bold text-secondary">
                Ringkasan Pesanan
              </h3>
            </div>

            {/* Order Items */}
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 max-h-60 md:max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-lg overflow-hidden mr-3 md:mr-4 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm md:text-base line-clamp-1">{item.title}</div>
                    <div className="text-gray-500 text-xs md:text-sm">
                      {item.quantity} × Rp {item.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="font-semibold text-sm md:text-base whitespace-nowrap ml-2">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 md:pt-6">
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-gray-600 text-sm md:text-base">
                  <span>Subtotal</span>
                  <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm md:text-base">
                  <span>Biaya Pengiriman</span>
                  <span className="text-success">Gratis</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm md:text-base">
                  <span>Biaya Layanan</span>
                  <span>Rp 2.000</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base md:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      Rp {(cartTotal + 2000).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Protection */}
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-accent rounded-lg">
              <div className="flex items-center text-primary mb-2">
                <FiLock className="mr-2" />
                <span className="font-medium text-sm md:text-base">100% Garansi Aman</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                Pesanan Anda dilindungi dengan sistem keamanan terbaik. Uang kembali jika tidak sesuai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;