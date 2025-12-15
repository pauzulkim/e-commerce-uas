import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiTag } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { featuredProducts, newProducts, categories } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Flash Sale Akhir Tahun",
      subtitle: "Diskon hingga 70%",
      description: "Berbagai produk pilihan dengan harga spesial",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200",
      buttonText: "Beli Sekarang",
      link: "/products?sort=discount",
      bgColor: "bg-gradient-to-r from-primary to-success",
    },
    {
      id: 2,
      title: "Teknologi Terbaru 2024",
      subtitle: "Produk Inovasi",
      description: "Temukan gadget dan elektronik terkini",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
      buttonText: "Lihat Koleksi",
      link: "/products?category=Electronics",
      bgColor: "bg-gradient-to-r from-secondary to-gray-800",
    },
    {
      id: 3,
      title: "Fashion Musim Panas",
      subtitle: "Koleksi Terbaru",
      description: "Style kekinian dengan harga terjangkau",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200",
      buttonText: "Belanja Sekarang",
      link: "/products?category=Fashion",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FiTruck size={24} />,
      title: "Gratis Ongkir",
      description: "Minimal pembelian Rp 50.000",
    },
    {
      icon: <FiShield size={24} />,
      title: "Garansi 100%",
      description: "Uang kembali jika tidak sesuai",
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: "Pengembalian",
      description: "14 hari pengembalian gratis",
    },
    {
      icon: <FiTag size={24} />,
      title: "Harga Terbaik",
      description: "Jaminan harga termurah",
    },
  ];

  if (!featuredProducts || !newProducts || !categories) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl mx-4 md:mx-8 my-6">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-lg">
                  <span className="text-white bg-primary px-3 py-1 rounded-full text-sm font-medium">
                    {banner.subtitle}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
                    {banner.title}
                  </h1>
                  <p className="text-gray-200 mt-4 text-lg">
                    {banner.description}
                  </p>
                  <Link
                    to={banner.link}
                    className="inline-flex items-center mt-8 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {banner.buttonText}
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Banner Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-accent text-center">
              <div className="text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-secondary mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
{/* Price Section - FIX untuk mobile */}
<div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-secondary">Kategori Populer</h2>
          <Link
            to="/products"
            className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center text-sm md:text-base"
          >
            Lihat Semua
            <FiArrowRight className="ml-1 md:ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-accent hover:shadow-md transition-shadow text-center group"
            >
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">{category.icon}</div>
              <h3 className="font-semibold text-secondary text-sm md:text-base mb-1 line-clamp-2 min-h-[2.5rem] md:min-h-0">
                {category.name}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm">{category.count || 0} produk</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12 bg-accent">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-secondary">Produk Unggulan</h2>
          <Link
            to="/products?sort=featured"
            className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
          >
            Lihat Semua
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
        {featuredProducts && featuredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((productItem) => (
            <ProductCard key={productItem.id} product={productItem} />
          ))}
        </div>
       ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada produk unggulan</p>
          </div>
        )}  
      </div>

      {/* New Arrivals */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-secondary">Produk Terbaru</h2>
          <Link
            to="/products?sort=newest"
            className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
          >
            Lihat Semua
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
        {newProducts && newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.slice(0, 8).map((productItem) => (
              <ProductCard key={productItem.id} product={productItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada produk baru</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Mulai Berbelanja Sekarang</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Temukan berbagai produk berkualitas dengan harga terbaik. Pengiriman cepat dan aman ke seluruh Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Jelajahi Produk
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;