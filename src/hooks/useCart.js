import { useCartContext } from "../context/CartContext";

/**
 * Custom hook for cart operations
 * Provides convenient access to cart state and actions
 */
const useCart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    clearCart,
  } = useCartContext();

  // Check if a product is in the cart
  const isInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };

  // Get a specific item from the cart
  const getCartItem = (productId) => {
    return cart.find((item) => item._id === productId);
  };

  // Get the quantity of a specific item in the cart
  const getItemQuantity = (productId) => {
    const item = getCartItem(productId);
    return item ? item.quantity : 0;
  };

  // Add item to cart with optional quantity
  const addItem = (product, quantity = 1) => {
    addToCart({ ...product, quantity });
  };

  // Remove item from cart
  const removeItem = (productId) => {
    removeFromCart(productId);
  };

  // Increment item quantity
  const incrementQuantity = (productId) => {
    const item = getCartItem(productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  // Decrement item quantity
  const decrementQuantity = (productId) => {
    const item = getCartItem(productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else if (item) {
      removeFromCart(productId);
    }
  };

  // Calculate subtotal for a specific item
  const getItemSubtotal = (productId) => {
    const item = getCartItem(productId);
    return item ? item.price * item.quantity : 0;
  };

  // Check if cart is empty
  const isEmpty = cart.length === 0;

  return {
    cart,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    getCartTotal,
    getCartItemsCount,
    clearCart,
    isInCart,
    getCartItem,
    getItemQuantity,
    getItemSubtotal,
    isEmpty,
  };
};

export default useCart;
