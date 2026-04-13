import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/Register";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ToastProvider } from "../context/ToastContext";

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;