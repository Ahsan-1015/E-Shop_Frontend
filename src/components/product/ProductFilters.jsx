import { useState, useEffect } from "react";

const ProductFilters = ({ onFilterChange, categories = [] }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      handleApplyFilters();
    }, 500);
    setSearchTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleApplyFilters = () => {
    onFilterChange({
      search: search.trim(),
      category,
      minPrice: minPrice ? Number(minPrice) : "",
      maxPrice: maxPrice ? Number(maxPrice) : "",
      sort,
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    onFilterChange({});
  };

  const activeFiltersCount = [category !== "all", search, minPrice, maxPrice, sort].filter(Boolean).length;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 p-6 mb-8 border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Filters & Search</h3>
            <p className="text-sm text-gray-500">
              {activeFiltersCount > 0 ? `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}` : 'Customize your search'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-all"
        >
          <svg className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Products</span>
            </label>
            <div className="relative group">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, description, category..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:bg-white"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>Category</span>
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setTimeout(handleApplyFilters, 100);
                }}
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 appearance-none cursor-pointer hover:bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span>Sort By</span>
            </label>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setTimeout(handleApplyFilters, 100);
                }}
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 appearance-none cursor-pointer hover:bg-white"
              >
                <option value="">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center space-x-2">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Price Range</span>
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && handleApplyFilters()}
                  placeholder="Min price"
                  min="0"
                  className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:bg-white"
                />
              </div>
            </div>
            <div className="w-8 h-0.5 bg-gray-300 rounded-full hidden sm:block"></div>
            <span className="text-gray-400 text-sm sm:hidden">to</span>
            <div className="flex-1 w-full">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && handleApplyFilters()}
                  placeholder="Max price"
                  min="0"
                  className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 group-hover:bg-white"
                />
              </div>
            </div>
            <button
              onClick={handleApplyFilters}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span>Apply</span>
            </button>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {category !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                <span>Category: {category}</span>
                <button onClick={() => { setCategory('all'); handleApplyFilters(); }} className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center space-x-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <span>Search: "{search}"</span>
                <button onClick={() => { setSearch(''); handleApplyFilters(); }} className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center space-x-1 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                <span>Price: ${minPrice || 0} - ${maxPrice || '∞'}</span>
                <button onClick={() => { setMinPrice(''); setMaxPrice(''); handleApplyFilters(); }} className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {sort && (
              <span className="inline-flex items-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <span>Sort: {sort.replace('_', ' ')}</span>
                <button onClick={() => { setSort(''); handleApplyFilters(); }} className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;