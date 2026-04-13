import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import { getProducts } from "../../services/productService";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCartContext();
  const { theme, toggleTheme, isDark } = useTheme();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const products = await getProducts({ search: searchQuery.trim() });
      setSearchResults(products);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length > 0) {
      setShowResults(true);
      // Quick search as user types
      const timer = setTimeout(async () => {
        try {
          const products = await getProducts({ search: value.trim() });
          setSearchResults(products.slice(0, 5));
        } catch (error) {
          console.error("Quick search error:", error);
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    clearSearch();
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg dark:shadow-gray-800/50 sticky top-0 z-50 border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-purple-500/25">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              E-Shop
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearch}>
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && setShowResults(true)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-14 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-800/50 overflow-hidden z-50 border border-gray-100 dark:border-gray-700">
                {searchResults.map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleResultClick(product._id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
                <Link
                  to={`/?search=${encodeURIComponent(searchQuery)}`}
                  onClick={clearSearch}
                  className="block p-3 text-center text-blue-600 dark:text-blue-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-t border-gray-100 dark:border-gray-700"
                >
                  View all results
                </Link>
              </div>
            )}

            {showResults && searchQuery && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-800/50 p-4 z-50 border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 text-center">No products found</p>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            <Link to="/cart" className="relative px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors group">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
              </span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 ml-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Wishlist Button */}
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </form>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                Cart {cart.length > 0 && `(${cart.length})`}
              </MobileNavLink>
              <MobileNavLink to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
              </MobileNavLink>
              {user ? (
                <>
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center space-x-2">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span>{user.name}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl text-left flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
  >
    <span className="flex items-center">{children}</span>
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
