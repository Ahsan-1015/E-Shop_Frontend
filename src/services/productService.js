const API_BASE_URL = "http://localhost:5000/api";

// Get all products
export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);

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
};
