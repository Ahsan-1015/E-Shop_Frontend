import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success, info } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const isWishlisted = isInWishlist(product._id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    success(`${product.name} added to cart!`);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (isWishlisted) {
      info(`${product.name} removed from wishlist`);
    } else {
      success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg shadow-gray-200/50 dark:shadow-gray-800/50 overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/30 dark:hover:shadow-gray-700/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>

          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>

          {product.discount && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              -{product.discount}%
            </span>
          )}

          {product.isNew && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              NEW
            </span>
          )}

          <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
            <button
              onClick={handleWishlist}
              className={`w-10 h-10 bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${isWishlisted ? 'bg-red-50 text-red-500' : 'hover:bg-blue-50 text-gray-600 hover:text-blue-500'}`}
            >
              <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full shadow-lg">
                Out of Stock
              </span>
            </div>
          )}

          <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`w-full py-3 rounded-2xl font-semibold text-white transition-all duration-300 transform ${
                isAdding
                  ? "bg-green-500 scale-95 shadow-lg shadow-green-500/30"
                  : "bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white shadow-lg hover:shadow-blue-500/25"
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {isAdding ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Added!</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Quick Add</span>
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="p-5">
          <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider rounded-lg">
            {product.category || "General"}
          </span>

          <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-3 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? "text-yellow-400" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-400 ml-2 font-medium">
              ({product.reviews || "100"})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.inStock && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                In Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
