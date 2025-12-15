import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiShoppingCart, FiEye } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // ✅ PASTIKAN: Pindahkan semua hook dan context calls ke atas
  const {
    filteredProducts, // ✅ Ini yang error - pindah ke atas
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  } = useProducts();

  // ✅ PASTIKAN: Inisialisasi state untuk pagination SETELAH semua hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // ✅ PERHITUNGAN untuk pagination - HARUS SETELAH state inisialisasi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // ✅ Pindahkan fungsi-fungsi SETELAH semua deklarasi state
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category, sort: sortBy });
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setSearchParams({ category: selectedCategory, sort });
    setCurrentPage(1); // Reset ke halaman 1
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
    setCurrentPage(1); // Reset ke halaman 1
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchParams({ 
      category: selectedCategory, 
      sort: sortBy,
      search: value 
    });
    setCurrentPage(1); // Reset ke halaman 1
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 50000000]);
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1); // Reset ke halaman 1
  };

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
    if (sort) setSortBy(sort);
  }, [searchParams, setSelectedCategory, setSearchQuery, setSortBy]);

  // Fungsi untuk pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // ✅ FUNGSI untuk list view - PASTIKAN SETELAH semua deklarasi
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleViewDetail = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const priceRanges = [
    { label: 'Semua Harga', min: 0, max: 50000000 },
    { label: 'Di bawah Rp 500.000', min: 0, max: 500000 },
    { label: 'Rp 500.000 - 1.000.000', min: 500000, max: 1000000 },
    { label: 'Rp 1.000.000 - 5.000.000', min: 1000000, max: 5000000 },
    { label: 'Di atas Rp 5.000.000', min: 5000000, max: 50000000 },
  ];

  // ✅ RENDER - PASTIKAN ini bagian terakhir
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl shadow-sm border border-accent p-6 sticky top-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-secondary">Filter</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary-dark"
              >
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Produk
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Cari produk..."
                className="input-field"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Kategori</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-accent'
                  }`}
                >
                  Semua Kategori ({filteredProducts.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-accent'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Rentang Harga</h4>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handlePriceChange(range.min, range.max)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      priceRange[0] === range.min && priceRange[1] === range.max
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-accent'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Rp {priceRange[0].toLocaleString('id-ID')}</span>
                  <span>Rp {priceRange[1].toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-accent p-4 sm:p-6 mb-4 sm:mb-6">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
    <div className="w-full sm:w-auto overflow-hidden">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-secondary mb-1 sm:mb-2 truncate">
        {selectedCategory === 'All' ? 'Semua Produk' : selectedCategory}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">
        Menampilkan {filteredProducts.length} produk
      </p>
    </div>

    <div className="flex items-center justify-between sm:justify-normal space-x-2 sm:space-x-4">
      {/* View Toggle - KECILKAN UNTUK MOBILE */}
      <div className="flex border border-accent rounded-lg overflow-hidden">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-1.5 sm:p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600'}`}
          aria-label="Grid view"
        >
          <FiGrid size={16} className="sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-1.5 sm:p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'}`}
          aria-label="List view"
        >
          <FiList size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Sort Dropdown - PERBAIKI UNTUK MOBILE */}
      <div className="relative min-w-[100px] sm:min-w-[140px]">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="appearance-none bg-white border border-accent rounded-lg pl-2 sm:pl-4 pr-6 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary focus:border-transparent w-full"
        >
          <option value="featured">Unggulan</option>
          <option value="price-low">Harga: Rendah</option>
          <option value="price-high">Harga: Tinggi</option>
          <option value="rating">Rating</option>
          <option value="newest">Terbaru</option>
        </select>
        <FiChevronDown className="absolute right-1.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3 sm:w-4 sm:h-4" />
      </div>

      {/* Mobile Filter Button - PERBAIKI */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center space-x-1 px-2.5 sm:px-4 py-1.5 sm:py-2 border border-accent rounded-lg text-gray-600 hover:bg-accent transition-colors text-xs sm:text-sm whitespace-nowrap"
        aria-label="Toggle filters"
      >
        <FiFilter size={14} className="sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Filter</span>
      </button>
    </div>
  </div>
</div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Produk tidak ditemukan
              </h3>
              <p className="text-gray-500 mb-6">
                Coba ubah filter pencarian Anda
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Reset Filter
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // ✅ LIST VIEW
            <div className="space-y-4">
              {currentItems.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl shadow-sm border border-accent p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(product.id)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="md:w-48">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-secondary hover:text-primary transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            Rp {product.price.toLocaleString('id-ID')}
                          </div>
                          {product.originalPrice > product.price && (
                            <div className="text-sm text-gray-500 line-through">
                              Rp {product.originalPrice.toLocaleString('id-ID')}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-yellow-400">
                            ★ {product.rating}
                          </div>
                          <span className="text-gray-500">({product.reviews} review)</span>
                        </div>
                        <div className="flex space-x-3">
                          <button 
                            className="btn-primary flex items-center"
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            <FiShoppingCart className="mr-2" />
                            Tambah ke Keranjang
                          </button>
                          <button 
                            className="btn-secondary flex items-center"
                            onClick={(e) => handleViewDetail(e, product.id)}
                          >
                            <FiEye className="mr-2" />
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-8">
              {/* Items Per Page Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Tampilkan:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value={8}>8 produk</option>
                    <option value={12}>12 produk</option>
                    <option value={16}>16 produk</option>
                    <option value={24}>24 produk</option>
                    <option value={32}>32 produk</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-600">
                  Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} dari {filteredProducts.length} produk
                </div>
              </div>
              
              {/* Pagination Buttons */}
              <div className="flex flex-col xs:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-accent rounded-lg text-gray-600 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                >
                  ← Sebelumnya
                </button>
                
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    if (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-colors text-sm ${
                            currentPage === pageNumber
                              ? 'bg-primary text-white'
                              : 'text-gray-600 hover:bg-accent'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  }).filter(Boolean)}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-accent rounded-lg text-gray-600 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                >
                  Selanjutnya →
                </button>
              </div>
              
              {/* Page Info - Mobile */}
              <div className="mt-4 text-center text-sm text-gray-500 md:hidden">
                Halaman {currentPage} dari {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;