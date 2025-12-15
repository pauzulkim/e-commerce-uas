import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { cartCount } = useCart();
  const { setSearchQuery } = useProducts();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      setSearchQuery(searchText);
      navigate('/products');
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    navigate('/');
  };

  const categories = [
    { name: 'Electronics', path: '/products?category=Electronics' },
    { name: 'Fashion', path: '/products?category=Fashion' },
    { name: 'Home & Living', path: '/products?category=Home%20%26%20Living' }, 
    { name: 'Books & Stationery', path: '/products?category=Books%20%26%20Stationery' }, 
    { name: 'Sports & Outdoors', path: '/products?category=Sports%20%26%20Outdoors' }, 
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-primary hidden md:block">
              T<span className="text-secondary">mart</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari produk, merek, atau kategori..."
                className="w-full px-4 py-3 pl-12 pr-10 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Cari
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            {/* Wishlist */}
            <Link to="/wishlist" className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <FiHeart size={22} />
              <span className="hidden lg:inline">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden lg:inline">Keranjang</span>
            </Link>

            {/* Account */}
            <Link to="/account" className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
              <FiUser size={22} />
              <span className="hidden lg:inline">Akun</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-primary"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-4 lg:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
        </div>

        {/* Navigation & Mobile Menu */}
        <nav className={`mt-4 lg:mt-0 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="py-2 lg:py-0 text-gray-600 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/products?category=All"
              className="py-2 lg:py-0 text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Semua Produk
            </Link>
            <Link
              to="/about"
              className="py-2 lg:py-0 text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Kami
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;