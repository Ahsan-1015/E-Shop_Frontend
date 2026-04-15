import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useCartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCartContext();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        if (data?._id) {
          setIsWishlisted(isInWishlist(data._id));
        }
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart({ ...product, quantity });
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
    setIsWishlisted(!isWishlisted);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">Product not found</p>
          <Link
            to="/"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
            {/* Category Badge */}
            <span className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              {product.category || "General"}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating || 4.5) ? "text-yellow-400" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating || "4.5"} ({product.reviews || "100"} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline space-x-4 mb-6">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-bold rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 mb-6">
              {product.inStock ? (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-600 font-semibold">In Stock</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">Ready to ship</span>
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-3">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isAdding
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-1"
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isAdding ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Added to Cart!</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to Cart</span>
                  </span>
                )}
              </button>
              <button 
                onClick={handleWishlistToggle}
                className={`w-14 h-14 border-2 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center ${
                  isWishlisted 
                    ? "bg-red-50 border-red-500 text-red-500" 
                    : "bg-white border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500"
                }`}
              >
                <svg className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Product Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-200/50 p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold text-gray-800">{product.category || "General"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-semibold text-gray-800">{product.inStock ? "In Stock" : "Out of Stock"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-2">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Secure Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
