import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });
    
    return () => observer.disconnect();
  }, []);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const success = useCallback((message) => addToast(message, "success"), [addToast]);
  const error = useCallback((message) => addToast(message, "error"), [addToast]);
  const warning = useCallback((message) => addToast(message, "warning"), [addToast]);
  const info = useCallback((message) => addToast(message, "info"), [addToast]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getToastStyles = (type) => {
    const baseStyles = "border-l-4 shadow-lg rounded-lg p-4 mb-3 flex items-center justify-between animate-slide-in";
    
    const typeStyles = {
      success: isDark 
        ? "bg-green-900/50 border-green-400 text-green-200" 
        : "bg-green-50 border-green-500 text-green-800",
      error: isDark 
        ? "bg-red-900/50 border-red-400 text-red-200" 
        : "bg-red-50 border-red-500 text-red-800",
      warning: isDark 
        ? "bg-yellow-900/50 border-yellow-400 text-yellow-200" 
        : "bg-yellow-50 border-yellow-500 text-yellow-800",
      info: isDark 
        ? "bg-blue-900/50 border-blue-400 text-blue-200" 
        : "bg-blue-50 border-blue-500 text-blue-800",
    };

    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  const getToastIcon = (type) => {
    const icons = {
      success: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      error: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[type] || icons.info;
  };

  const value = {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast,
    getToastStyles,
    getToastIcon,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-20 right-4 z-50 max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={getToastStyles(toast.type)}
          >
            <div className="flex items-center">
              <span className="mr-3">{getToastIcon(toast.type)}</span>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;