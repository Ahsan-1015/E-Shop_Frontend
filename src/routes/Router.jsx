import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { AuthProvider, useAuth } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ToastProvider } from "../context/ToastContext";
import { swal } from "../utils/swal";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminOrders from "../pages/admin/AdminOrders";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import UserOrders from "../pages/dashboard/UserOrders";
import UserProfile from "../pages/dashboard/UserProfile";
import UserWishlist from "../pages/dashboard/UserWishlist";
import ChangePassword from "../pages/dashboard/ChangePassword";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    swal.warning("Access Denied", "You are not an admin.");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

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
                      
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute adminOnly>
                            <AdminLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="orders" element={<AdminOrders />} />
                      </Route>

                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <UserDashboardLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<Navigate to="/dashboard/orders" replace />} />
                        <Route path="orders" element={<UserOrders />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="wishlist" element={<UserWishlist />} />
                        <Route path="password" element={<ChangePassword />} />
                      </Route>
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