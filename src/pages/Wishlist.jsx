import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import ProductCard from "../components/product/ProductCard";

const Wishlist = () => {
  const { wishlist, clearWishlist, getWishlistCount } = useWishlist();
  const { success, info } = useToast();

  const handleRemoveFromWishlist = (productName) => {
    success(`${productName} removed from wishlist`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Save your favorite products to buy them later</p>
            <Link to="/" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg transition-all">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Wishlist</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {getWishlistCount()} {getWishlistCount() === 1 ? "item" : "items"} saved
            </p>
          </div>
          <button
            onClick={() => {
              clearWishlist();
              success("Wishlist cleared");
            }}
            className="mt-4 md:mt-0 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;