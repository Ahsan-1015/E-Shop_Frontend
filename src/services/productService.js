const API_BASE_URL = "http://localhost:5000/api";

// Get all products with filters
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category && filters.category !== 'all') params.append('category', filters.category);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch products");
  }

  return response.json();
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Product not found");
  }

  return response.json();
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch products");
  }

  return response.json();
};

// Search products
export const searchProducts = async (query) => {
  const response = await fetch(`${API_BASE_URL}/products/search/${query}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to search products");
  }

  return response.json();
};

export default {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
};
