import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const prevUserIdRef = useRef(null);

  // Save wishlist to backend
  const syncWishlistToBackend = async (items) => {
    if (!isAuthenticated || !user || !user._id) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });
    } catch (error) {
      console.error("Failed to sync wishlist:", error);
    }
  };

  // Load user wishlist from backend when user changes
  useEffect(() => {
    let isCancelled = false;
    
    const loadUserWishlist = async () => {
      // Reset wishlist when not authenticated
      if (!isAuthenticated || !user || !user._id) {
        setWishlist([]);
        prevUserIdRef.current = null;
        setIsLoading(false);
        return;
      }
      
      // Force reload when user logs in (even same user after logout)
      // by not checking prevUserIdRef on initial load
      if (prevUserIdRef.current === user._id && wishlist.length > 0) {
        setIsLoading(false);
        return;
      }
      
      prevUserIdRef.current = user._id;
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const response = await fetch(`${API_URL}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!isCancelled && response.ok) {
          const data = await response.json();
          setWishlist(data.items || []);
        } else if (!isCancelled && response.status === 401) {
          // User was deleted - clear wishlist
          setWishlist([]);
        }
      } catch (error) {
        console.error("Failed to load user wishlist:", error);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };
    
    // Small delay to ensure auth is ready
    const timer = setTimeout(() => {
      loadUserWishlist();
    }, 300);
    
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [isAuthenticated, user]);

  const addToWishlist = (product) => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent("show-toast", { 
        detail: { message: "Please login to add items to wishlist", type: "warning" } 
      }));
      window.location.href = "/login";
      return;
    }

    setWishlist((prev) => {
      if (prev.find((item) => item._id === product._id)) {
        return prev;
      }
      const newWishlist = [...prev, product];
      syncWishlistToBackend(newWishlist);
      return newWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item) => item._id !== productId);
      syncWishlistToBackend(newWishlist);
      return newWishlist;
    });
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    syncWishlistToBackend([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  // Refresh wishlist from backend
  const refreshWishlist = async () => {
    if (!isAuthenticated || !user || !user._id) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await fetch(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.items || []);
      }
    } catch (error) {
      console.error("Error refreshing wishlist:", error);
    }
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    refreshWishlist,
    isLoading,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
