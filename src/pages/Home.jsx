import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";
import HeroCarousel from "../components/product/HeroCarousel";
import { getProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [visibleCount, setVisibleCount] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let isActive = true;
    
    const loadProducts = async () => {
      try {
        const data = await getProducts({});
        if (isActive) {
          setProducts(data);
          const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        if (isActive) {
          setError("Failed to load products");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };
    
    loadProducts();
    
    return () => { isActive = false; };
  }, []);

  useEffect(() => {
    // If there's a search param, update filters
    if (searchQuery) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [searchQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedCategory(null);
    setVisibleCount(12);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setLoadingMore(false);
    }, 500);
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory && selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
    return true;
  });

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-500 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const categoryIcons = {
    Electronics: '📱',
    Clothing: '👕',
    Books: '📚',
    Home: '🏠',
    Sports: '⚽',
    Beauty: '💄',
    Toys: '🎮',
    Accessories: '👜',
    Food: '🍯',
    Garden: '🌱'
  };

  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="h-32 sm:h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-3 sm:p-4">
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
        <div className="h-2 sm:h-3 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
        <div className="flex justify-between">
          <div className="h-4 sm:h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
          <div className="h-4 sm:h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
        </div>
      </div>
    </div>
  );

  const displayProducts = (selectedCategory || filters.search || filters.minPrice || filters.maxPrice 
    ? filteredProducts 
    : products).slice(0, visibleCount);

  const totalProducts = selectedCategory || filters.search || filters.minPrice || filters.maxPrice 
    ? filteredProducts 
    : products;

  const hasMore = visibleCount < totalProducts.length;

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel products={products} />

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10K+</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">500+</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">50+</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Brands</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">4.9★</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Shop by Category</h2>
              <p className="text-gray-500">Browse our products by category</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`p-6 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white hover:bg-white/80 shadow-lg shadow-gray-200/50 hover:shadow-xl'
                  }`}
                >
                  <span className="text-3xl block mb-2">{categoryIcons[category] || '📦'}</span>
                  <span className={`font-semibold ${selectedCategory === category ? 'text-white' : 'text-gray-700'}`}>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section id="products" className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
            </h2>
            <p className="text-gray-500">
              {totalProducts.length} {totalProducts.length === 1 ? 'product' : 'products'} available • Showing {displayProducts.length}
            </p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 md:mt-0 text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear category</span>
            </button>
          )}
        </div>
        
        <ProductFilters onFilterChange={handleFilterChange} categories={categories} />
        
        {displayProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg shadow-gray-200/50">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">No products found matching your criteria</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
            <button
              onClick={() => handleFilterChange({})}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {displayProducts.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
              {loadingMore && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <ProductSkeleton key={`skeleton-${i}`} />
                  ))}
                </>
              )}
            </div>
            
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : `Load More (${totalProducts.length - visibleCount} more)`}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Features Banner */}
      <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">Free Shipping</p>
                <p className="text-xs sm:text-sm text-gray-400">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">Secure Payment</p>
                <p className="text-xs sm:text-sm text-gray-400">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">Easy Returns</p>
                <p className="text-xs sm:text-sm text-gray-400">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">24/7 Support</p>
                <p className="text-xs sm:text-sm text-gray-400">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 text-violet-700 dark:text-violet-300 dark:from-violet-900/50 dark:via-purple-900/50 dark:to-fuchsia-900/50 text-sm font-semibold rounded-full mb-4 animate-fadeIn">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              The E-Shop Advantage
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              We go above and beyond to ensure your shopping experience is exceptional.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-blue-500/10 dark:to-purple-500/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Free Shipping</h3>
                <p className="text-gray-500 dark:text-gray-400">Enjoy free shipping on all orders over $50 with fast delivery options.</p>
              </div>
            </div>
            <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-purple-500/10 dark:to-pink-500/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Quality Guarantee</h3>
                <p className="text-gray-500 dark:text-gray-400">Every product is handpicked and quality checked before shipping.</p>
              </div>
            </div>
            <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-pink-500/10 dark:to-orange-500/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-colors duration-500"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Fast Delivery</h3>
                <p className="text-gray-500 dark:text-gray-400">Quick processing and shipping to get your products on time.</p>
              </div>
            </div>
            <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-orange-500/10 dark:to-amber-500/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors duration-500"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">24/7 Support</h3>
                <p className="text-gray-500 dark:text-gray-400">Round-the-clock customer support for any queries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
