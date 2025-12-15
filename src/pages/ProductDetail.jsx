import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiTruck, FiShield, FiRefreshCw, FiChevronLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Produk Tidak Ditemukan
          </h2>
          <p className="text-gray-500 mb-8">
            Produk yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400'
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const features = [
    { icon: <FiTruck />, text: 'Gratis Ongkir', subtext: 'Min. Rp 50.000' },
    { icon: <FiShield />, text: 'Garansi 100%', subtext: 'Uang Kembali' },
    { icon: <FiRefreshCw />, text: 'Pengembalian', subtext: '14 Hari' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary mb-6"
      >
        <FiChevronLeft className="mr-2" />
        Kembali
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm border border-accent p-4 mb-4">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex space-x-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-1 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? 'border-primary'
                    : 'border-accent'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          {/* Product Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-yellow-400">
                    <FiStar className="fill-current" />
                    <span className="ml-1 font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                  <span className="text-success font-medium">
                    Stok: {product.stock}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-full ${
                    isWishlisted
                      ? 'bg-primary text-white'
                      : 'bg-accent text-gray-600 hover:bg-primary hover:text-white'
                  }`}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FiHeart size={20} />
                </button>
                <button
                  className="p-3 rounded-full bg-accent text-gray-600 hover:bg-primary hover:text-white"
                  title="Share"
                >
                  <FiShare2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Price Section */}
          // Di ProductDetail.jsx - PERBAIKI BAGIAN HARGA
// GANTI bagian Price Section (sekitar baris 110-140):
{/* Price Section - FIX untuk mobile */}
<div className="bg-accent rounded-xl p-4 md:p-6 mb-6">
  <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 mb-4">
    <div className="text-2xl md:text-4xl font-bold text-primary mb-2 sm:mb-0 break-all">
      Rp {product.price.toLocaleString('id-ID')}
    </div>
    {product.originalPrice > product.price && (
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-lg md:text-2xl text-gray-500 line-through break-all">
          Rp {product.originalPrice.toLocaleString('id-ID')}
        </div>
        <div className="bg-primary text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold whitespace-nowrap">
          -{product.discount}%
        </div>
      </div>
    )}
  </div>
  
  {/* Features - Responsif untuk mobile */}
  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
    {features.map((feature, index) => (
      <div key={index} className="text-center p-2 md:p-0">
        <div className="text-primary mb-1 md:mb-2 flex justify-center">
          {feature.icon}
        </div>
        <div className="font-medium text-xs md:text-sm">{feature.text}</div>
        <div className="text-xs text-gray-500">{feature.subtext}</div>
      </div>
    ))}
  </div>
</div>

          {/* Quantity & Actions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <div className="flex items-center border border-accent rounded-lg w-32">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-accent"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center px-4 py-2 border-x border-accent">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-accent"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Subtotal</div>
                <div className="text-2xl font-bold text-primary">
                  Rp {(product.price * quantity).toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-secondary py-4 text-lg font-semibold flex items-center justify-center"
              >
                <FiShoppingCart className="mr-2" />
                Tambah ke Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-primary py-4 text-lg font-semibold"
              >
                Beli Sekarang
              </button>
            </div>
          </div>

          {/* Product Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-secondary mb-4">
              Spesifikasi Produk
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b border-accent">
          <div className="flex space-x-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 font-medium text-lg ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'description' && 'Deskripsi'}
                {tab === 'specifications' && 'Spesifikasi'}
                {tab === 'reviews' && 'Ulasan'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Deskripsi Produk
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Produk ini memiliki kualitas terbaik dengan garansi resmi. Cocok untuk berbagai kebutuhan Anda dengan fitur-fitur unggulan yang memudahkan pengguna.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Informasi Umum</h4>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 text-gray-600">Kategori</td>
                      <td className="py-3 font-medium">{product.category}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 text-gray-600">Merek</td>
                      <td className="py-3 font-medium">{product.title.split(' ')[0]}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 text-gray-600">Kondisi</td>
                      <td className="py-3 font-medium text-success">Baru</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Detail Teknis</h4>
                <table className="w-full">
                  <tbody>
                    {product.features.map((feature, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 text-gray-600">Fitur {index + 1}</td>
                        <td className="py-3 font-medium">{feature}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-3xl font-bold text-secondary">
                    {product.rating} <span className="text-lg text-gray-500">/ 5.0</span>
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button className="btn-primary">
                  Tulis Ulasan
                </button>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-accent pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                          U{review}
                        </div>
                        <div>
                          <div className="font-semibold">User {review}</div>
                          <div className="flex items-center text-yellow-400">
                            <FiStar className="fill-current" />
                            <span className="ml-1 text-sm">5.0</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        2 hari yang lalu
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Produk sangat bagus, sesuai dengan deskripsi. Pengiriman cepat dan packaging rapi. Recommended!
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Produk Serupa
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* This would be actual related products in a real app */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm border border-accent p-4">
              <div className="h-40 bg-accent rounded-lg mb-4"></div>
              <h3 className="font-semibold text-secondary mb-2">
                Produk Serupa {item}
              </h3>
              <div className="text-primary font-bold">
                Rp 1.000.000
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;