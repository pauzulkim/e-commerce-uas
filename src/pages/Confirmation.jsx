// Confirmation.jsx - FIXED BY LUMA (NO FLOW REMOVED)
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { FiCheck, FiShoppingBag, FiTruck, FiHome, FiShoppingCart } from 'react-icons/fi';

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("order");

  useEffect(() => {
    console.log("STATE dari checkout:", location.state);
    console.log("Order ID dari URL:", orderId);

    // 1️⃣ Jika ada orderData dari checkout → gunakan ini (ALUR UTAMA)
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
      setLoading(false);
      return;
    }

    // 2️⃣ Jika ada orderId → coba ambil dari localStorage
    if (orderId) {
      const saved = localStorage.getItem(`order_${orderId}`);

      if (saved) {
        try {
          setOrderData(JSON.parse(saved));
          setLoading(false);
          return;
        } catch (err) {
          console.error("Gagal parse localStorage:", err);
        }
      }

      // 3️⃣ Fallback terakhir → MOCK FETCH (tidak dihapus)
      const timer = setTimeout(() => {
        setOrderData({
          id: orderId,
          date: new Date().toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          total: 0,
          status: "Diproses",
          paymentMethod: "Transfer Bank",
          estimatedDelivery: "2-3 hari kerja",
          items: []
        });

        setLoading(false);
      }, 900);

      return () => clearTimeout(timer);
    }

    // 4️⃣ Tidak ada data sama sekali → jangan loading selamanya → redirect aman
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 800);

    return () => clearTimeout(timer);

  }, [location.state, orderId, navigate]);

  // =========================
  // LOADING VIEW
  // =========================
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Memproses Konfirmasi...
          </h2>
          <p className="text-gray-500">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  // =========================
  // JIKA TETAP TIDAK ADA ORDER DATA
  // =========================
  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Data Pesanan Tidak Ditemukan
          </h2>
          <p className="text-gray-500 mb-8">
            Redirect ke keranjang...
          </p>
          <button
            onClick={() => navigate('/cart')}
            className="btn-primary"
          >
            Ke Keranjang
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // DISPLAY SUCCESS PAGE
  // =========================
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">

        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-green-500 w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Pesanan Berhasil!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Terima kasih telah berbelanja di toko kami
          </p>
          <div className="mt-2 text-xs sm:text-sm text-gray-500">
            Order ID: <span className="font-mono font-bold">{orderData.id}</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-sm border border-accent p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Detail Pesanan</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Pesanan</span>
              <span className="font-medium">{orderData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="text-green-600 font-medium">{orderData.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Metode Pembayaran</span>
              <span className="font-medium">{orderData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimasi Pengiriman</span>
              <span className="font-medium">{orderData.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-3">Langkah Selanjutnya</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <FiShoppingBag className="text-blue-500 mt-0.5 mr-3" />
              <span className="text-sm sm:text-base">Anda akan menerima email konfirmasi dalam waktu 24 jam</span>
            </li>
            <li className="flex items-start">
              <FiTruck className="text-blue-500 mt-0.5 mr-3" />
              <span className="text-sm sm:text-base">Pesanan akan dikirim setelah pembayaran dikonfirmasi</span>
            </li>
            <li className="flex items-start">
              <FiShoppingBag className="text-blue-500 mt-0.5 mr-3" />
              <span className="text-sm sm:text-base">Anda dapat melacak pesanan di halaman profil Anda</span>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
          >
            <FiHome /> Kembali ke Beranda
          </button>

          <button
            onClick={() => navigate('/products')}
            className="flex-1 btn-outline py-3 flex items-center justify-center gap-2"
          >
            <FiShoppingCart /> Lanjutkan Belanja
          </button>
        </div>

        <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
          <p>Butuh bantuan? <a href="/contact" className="text-primary hover:underline">Hubungi kami</a></p>
        </div>

      </div>
    </div>
  );
};

export default Confirmation;
