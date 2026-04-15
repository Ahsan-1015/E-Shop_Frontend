const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Login user
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Invalid credentials");
  }

  return response.json();
};

// Register user
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

// Get user profile
export const getUserProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get profile");
  }

  return response.json();
};

// Social login (Google, GitHub)
export const socialLogin = async (name, email, provider, providerId, photoURL) => {
  const response = await fetch(`${API_BASE_URL}/auth/social-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, provider, providerId, photoURL }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Social login failed");
  }

  return response.json();
};

export default {
  loginUser,
  getUserProfile,
  socialLogin,
};
