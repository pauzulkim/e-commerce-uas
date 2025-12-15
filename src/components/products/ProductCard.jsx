import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  
  const { 
    addToCart, 
    addToWishlist, 
    isInWishlist = () => false, // ✅ DEFAULT VALUE jika function tidak ada
    removeFromWishlist 
  } = useCart();
  
  // ✅ CHECK: Pastikan function ada sebelum digunakan
  const isWishlisted = typeof isInWishlist === 'function' ? isInWishlist(product.id) : false;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!addToCart || typeof addToCart !== 'function') {
      console.error('addToCart function not available');
      return;
    }
    
    setAddingToCart(true);
    try {
      await addToCart(product, 1);
      // Optional: Show success message
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setTimeout(() => setAddingToCart(false), 500);
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingToWishlist(true);
    try {
      if (isWishlisted) {
        if (removeFromWishlist && typeof removeFromWishlist === 'function') {
          await removeFromWishlist(product.id);
        }
      } else {
        if (addToWishlist && typeof addToWishlist === 'function') {
          await addToWishlist(product);
        }
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setTimeout(() => setAddingToWishlist(false), 500);
    }
  };

  // ✅ Cek jika product valid
  if (!product || !product.id) {
    return null;
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className="card h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden bg-accent">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400'}
            alt={product.title || 'Product'}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400';
            }}
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </div>
          )}
          
          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}

          {/* Stock Indicator */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
            Stok: {product.stock || 0} unit
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={handleWishlist}
              disabled={addingToWishlist}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isWishlisted 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-primary hover:text-white'
              } ${addingToWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {addingToWishlist ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <FiHeart size={18} />
              )}
            </button>
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-10 h-10 rounded-full bg-white text-gray-600 hover:bg-primary hover:text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to cart"
            >
              {addingToCart ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <FiShoppingCart size={18} />
              )}
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white text-gray-600 hover:bg-primary hover:text-white flex items-center justify-center"
              title="Quick view"
            >
              <FiEye size={18} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <div className="text-xs text-gray-500 mb-1">{product.category || 'Uncategorized'}</div>
          
          {/* Title */}
          <h3 className="font-semibold text-secondary mb-2 line-clamp-1 hover:text-primary transition-colors">
            {product.title || 'Product Name'}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">{product.rating || 0}</span>
            </div>
            <span className="text-gray-400 text-sm">({product.reviews || 0} review)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-primary">
                Rp {product.price ? product.price.toLocaleString('id-ID') : '0'}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-sm text-gray-500 line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </div>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to cart"
            >
              {addingToCart ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FiShoppingCart size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;