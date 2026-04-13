import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const socialLogin = async (name, email, provider, providerId, photoURL) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/social-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, provider, providerId, photoURL }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Social login failed");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Force page reload to reset all state
    window.location.href = "/login";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    socialLogin,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
