import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import { getProducts } from "../../services/productService";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCartContext();
  const { isDark, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Debounced real-time search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search - wait 300ms after typing stops
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const products = await getProducts({ search: searchQuery.trim() });
        setSearchResults(products.slice(0, 6));
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Handle form submit - go to search page
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowResults(false);
    navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const closeDrawer = () => setUserDrawerOpen(false);

  return (
    <>
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg dark:shadow-gray-800/50 sticky top-0 z-50 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-xl blur-md opacity-60"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-purple-500/40">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  E
                </span>
                <span className="text-gray-900 dark:text-white">Shop</span>
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-xl mx-8 relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-24 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  {/* Loading Spinner */}
                  {isSearching && (
                    <div className="absolute right-14 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-5 h-5 animate-spin text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}

                  {/* Clear Button */}
                  {searchQuery && !isSearching && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-14 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700">
                  {searchResults.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleResultClick(product._id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {product.name}
                        </p>
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          ${product.price}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ))}
                  <Link
                    to={`/?search=${encodeURIComponent(searchQuery)}`}
                    onClick={clearSearch}
                    className="block p-3 text-center text-blue-600 dark:text-blue-400 font-semibold hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border-t border-gray-100 dark:border-gray-700 transition-all"
                  >
                    View all results for "{searchQuery}"
                  </Link>
                </div>
              )}

              {/* No Results */}
              {showResults &&
                searchQuery &&
                searchResults.length === 0 &&
                !isSearching && (
                  <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 z-50 border border-gray-100 dark:border-gray-700 text-center">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-300 mb-3"
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
                    <p className="text-gray-500 dark:text-gray-400">
                      No products found for "{searchQuery}"
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                )}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  fill={wishlist.length > 0 ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-500 dark:border-white"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-6 h-6  text-yellow-500  "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <button
                  onClick={() => setUserDrawerOpen(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/50"
                    />
                  ) : (
                    <div className="relative w-8 h-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-sm opacity-60"></div>
                      <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                  <span className="text-gray-900 dark:text-white font-medium">
                    {user.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Buttons */}
            <div className="flex md:hidden items-center space-x-1">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search - with suggestions */}
          {isSearchOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowResults(true)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-24 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 dark:text-white placeholder-gray-500"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {/* Loading Spinner */}
                {isSearching && (
                  <div className="absolute right-14 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 animate-spin text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}

                {/* Clear Button */}
                {searchQuery && !isSearching && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-14 top-1/2 -translate-y-1/2 p-1"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>

              {/* Mobile Search Results */}
              {showResults && searchResults.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700 max-h-72 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => {
                        handleResultClick(product._id);
                        setIsSearchOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                          ${product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                  <Link
                    to={`/?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      clearSearch();
                      setIsSearchOpen(false);
                    }}
                    className="block p-3 text-center text-blue-600 dark:text-blue-400 font-medium border-t border-gray-100 dark:border-gray-700"
                  >
                    View all results
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                <MobileNavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart {cart.length > 0 && `(${cart.length})`}
                </MobileNavLink>
                <MobileNavLink
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </MobileNavLink>

                {/* Dark Mode Toggle - Mobile */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {isDark ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <span>Light Mode</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                      <span>Dark Mode</span>
                    </div>
                  )}
                </button>

                {user ? (
                  <>
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                      <span className="text-gray-900 dark:text-white font-medium flex items-center space-x-2">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/50"
                          />
                        ) : (
                          <div className="relative w-8 h-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-sm opacity-60"></div>
                            <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white font-semibold text-sm">
                                {user.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                        )}
                        <span>{user.name}</span>
                      </span>
                    </div>
                    {user.role === "admin" && (
                      <MobileNavLink
                        to="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Admin Panel
                      </MobileNavLink>
                    )}
                    <MobileNavLink
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm-10 9a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z"
                        />
                      </svg>
                      My Dashboard
                    </MobileNavLink>
                    <MobileNavLink
                      to="/dashboard/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      My Orders
                    </MobileNavLink>
                    <MobileNavLink
                      to="/dashboard/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      My Wishlist
                    </MobileNavLink>
                    <MobileNavLink
                      to="/dashboard/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      My Profile
                    </MobileNavLink>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl text-left flex items-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl text-center flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* User Drawer - Modal Style */}
      {userDrawerOpen && user && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={closeDrawer}
          />
          <div className="fixed right-0 top-0 h-full w-80 max-w-sm bg-white dark:bg-gray-800 shadow-2xl z-[9999] overflow-hidden flex flex-col animate-slideInRight">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <div className="flex items-center space-x-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50 shadow-lg"
                  />
                ) : (
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-60"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-purple-500/50">
                      <span className="text-white font-bold text-lg">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">
                    {user.name}
                  </p>
                  <span className="inline-block mt-0.5 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeDrawer}
                  className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Admin Panel</span>
                </Link>
              )}
              <Link
                to="/dashboard"
                onClick={closeDrawer}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm-10 9a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z"
                    />
                  </svg>
                </div>
                <span className="font-medium">My Dashboard</span>
              </Link>
              <Link
                to="/dashboard/orders"
                onClick={closeDrawer}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <span className="font-medium">My Orders</span>
              </Link>
              <Link
                to="/dashboard/wishlist"
                onClick={closeDrawer}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">My Wishlist</span>
              </Link>
              <Link
                to="/dashboard/profile"
                onClick={closeDrawer}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="font-medium">My Profile</span>
              </Link>
              <Link
                to="/dashboard/password"
                onClick={closeDrawer}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Change Password</span>
              </Link>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <button
                onClick={() => {
                  closeDrawer();
                  logout();
                }}
                className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center"
  >
    {children}
  </Link>
);

export default Navbar;
