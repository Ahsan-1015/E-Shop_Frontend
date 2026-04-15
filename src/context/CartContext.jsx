import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "${API_URL}";

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const prevUserIdRef = useRef(null);

  // Save cart to backend
  const syncCartToBackend = useCallback(async (cartItems) => {
    if (!isAuthenticated || !user || !user._id) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await fetch("${API_URL}/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cartItems }),
      });
      
      if (!response.ok) {
        console.error("Failed to sync cart, status:", response.status);
      }
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  }, [isAuthenticated, user]);

  // Load user cart from backend when user changes
  useEffect(() => {
    let isCancelled = false;
    
    const loadUserCart = async () => {
      // Reset cart when not authenticated
      if (!isAuthenticated || !user || !user._id) {
        setCart([]);
        prevUserIdRef.current = null;
        setIsLoading(false);
        return;
      }
      
      // Force reload when user logs in (even same user after logout)
      // by not checking prevUserIdRef on initial load
      if (prevUserIdRef.current === user._id && cart.length > 0) {
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
        
        const response = await fetch("${API_URL}/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!isCancelled) {
          if (response.ok) {
            const data = await response.json();
            setCart(data.items || []);
          } else if (response.status === 401) {
            // User was deleted - clear cart
            setCart([]);
          } else {
            console.error("Failed to load cart, status:", response.status);
          }
          setIsLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load user cart:", error);
          setIsLoading(false);
        }
      }
    };
    
    // Small delay to ensure auth is ready
    const timer = setTimeout(() => {
      loadUserCart();
    }, 300);
    
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [isAuthenticated, user]);

  // Add item to cart
  const addToCart = (product) => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent("show-toast", { 
        detail: { message: "Please login to add items to cart", type: "warning" } 
      }));
      window.location.href = "/login";
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item,
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
      
      syncCartToBackend(newCart);
      return newCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item._id !== productId);
      syncCartToBackend(newCart);
      return newCart;
    });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item,
      );
      syncCartToBackend(newCart);
      return newCart;
    });
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get cart items count
  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Clear cart - reload from backend after clearing
  const clearCart = async () => {
    setCart([]);
    await syncCartToBackend([]);
    
    // Reload from backend to ensure sync
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("${API_URL}/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setCart(data.items || []);
        }
      }
    } catch (error) {
      console.error("Error reloading cart:", error);
    }
  };

  // Refresh cart from backend
  const refreshCart = useCallback(async () => {
    if (!isAuthenticated || !user || !user._id) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await fetch("${API_URL}/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.items || []);
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  }, [isAuthenticated, user]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    clearCart,
    refreshCart,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
