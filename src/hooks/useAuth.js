import { useAuth as useAuthContext } from "../context/AuthContext";

/**
 * Custom hook for authentication operations
 * Provides convenient access to auth state and actions
 */
const useAuth = () => {
  const { user, login, logout } = useAuthContext();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Get user's display name
  const getDisplayName = () => {
    return user?.name || user?.email || "Guest";
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    getDisplayName,
  };
};

export default useAuth;
