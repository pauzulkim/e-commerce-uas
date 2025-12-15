import React, { createContext, useState, useContext, useEffect } from 'react';
import { products, categories } from '../data/products';
import { useSearchParams } from 'react-router-dom';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [allProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Effect untuk membaca category dari URL saat pertama kali load
useEffect(() => {
  const categoryParam = searchParams.get('category');
  
  if (categoryParam) {
    // Decode URL parameter
    const decodedCategory = decodeURIComponent(categoryParam);
    console.log('Category from URL:', categoryParam, 'Decoded:', decodedCategory);
    
    // Normalize comparison: handle & symbol both ways
    const foundCategory = categories.find(cat => {
      // Compare with exact match
      if (cat.name === decodedCategory) return true;
      
      // Try replacing ' & ' with ' and ' for comparison
      const catNameNormalized = cat.name.replace(/ & /g, ' and ');
      const decodedNormalized = decodedCategory.replace(/ & /g, ' and ');
      
      return catNameNormalized === decodedNormalized;
    });
    
    if (foundCategory) {
      setSelectedCategory(foundCategory.name);
      console.log('Setting category to:', foundCategory.name);
    } else {
      console.log('Category not found, showing all');
      setSelectedCategory('All');
    }
  } else {
    setSelectedCategory('All');
  }
  setIsLoading(false);

}, [searchParams]);

  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      console.log('Filtering by category:', selectedCategory);
      console.log('Available categories:', [...new Set(allProducts.map(p => p.category))]);
      
      filtered = filtered.filter(product => {
        const match = product.category === selectedCategory;
        if (!match) {
          console.log(`Mismatch: Product "${product.title}" has category "${product.category}", looking for "${selectedCategory}"`);
        }
        return match;
      });
      
      console.log(`Found ${filtered.length} products for category "${selectedCategory}"`);
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // featured
        filtered.sort((a, b) => (b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? -1 : 1));
        break;
    }

    return filtered;
  };

  const getProductById = (id) => {
    return allProducts.find(product => product.id === parseInt(id));
  };

  const getFeaturedProducts = () => {
    return allProducts.filter(product => product.isFeatured);
  };

  const getNewProducts = () => {
    return allProducts.filter(product => product.isNew);
  };

  const getProductsByCategory = (categoryName) => {
    console.log('Getting products for category:', categoryName);
    const filtered = allProducts.filter(product => product.category === categoryName);
    console.log(`Found ${filtered.length} products for "${categoryName}"`);
    return filtered;
  };

  const getCategories = () => {
    return categories;
  };

  // Function untuk handle category selection dengan URL encoding yang benar
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Function untuk mendapatkan URL yang benar untuk kategori
  const getCategoryUrl = (categoryName) => {
    // Encode hanya spasi, biarkan & seperti biasa
    const encodedName = categoryName.replace(/ /g, '%20');
    return `/products?category=${encodedName}`;
  };

  return (
    <ProductContext.Provider
      value={{
        products: allProducts,
        filteredProducts: getFilteredProducts(),
        featuredProducts: getFeaturedProducts(),
        newProducts: getNewProducts(),
        categories: getCategories(),
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory: handleCategorySelect, // Gunakan custom handler
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        getProductById,
        getProductsByCategory,
        getCategoryUrl, // Export function untuk mendapatkan URL
        isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};