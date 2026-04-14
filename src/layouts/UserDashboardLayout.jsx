import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "My Orders", path: "/dashboard/orders" },
  { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Wishlist", path: "/dashboard/wishlist" },
  { icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", label: "Shopping Cart", path: "/cart" },
  { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "My Profile", path: "/dashboard/profile" },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Change Password", path: "/dashboard/password" },
];

export default function UserDashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("/dashboard/orders");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      
      {/* Mobile Header - Hidden on lg+ */}
      <header className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 shadow-sm">
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">E</span></div>
          <span className="text-lg font-bold text-gray-800 dark:text-white">Dashboard</span>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Desktop Sidebar - Fixed for lg+ */}
      <aside className={`hidden lg:flex flex-col ${sidebarOpen ? 'w-64 xl:w-72' : 'w-20'} bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 text-white dark:text-gray-200 fixed h-full z-10 transition-all duration-300`}>
        <div className="h-16 xl:h-20 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-lg">E</span></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">E-Shop</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto"><span className="text-white font-bold text-lg">E</span></div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} /></svg>
          </button>
        </div>
        <nav className={`p-4 space-y-2 flex-1 overflow-y-auto ${!sidebarOpen && 'px-2'}`}>
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setActiveMenu(item.path)} className={`flex items-center px-4 py-3 rounded-xl transition-all ${activeMenu === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"} ${!sidebarOpen && 'justify-center px-3'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className={`p-4 border-t border-gray-100 dark:border-gray-700 ${!sidebarOpen && 'px-2'}`}>
          <div className={`flex items-center px-4 py-3 rounded-xl ${!sidebarOpen ? 'justify-center' : ''}`}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center"><span className="text-white font-bold">{user?.name?.charAt(0).toUpperCase()}</span></div>
            )}
            {sidebarOpen && <div className="ml-3"><p className="font-medium text-sm text-gray-700 dark:text-gray-200">{user?.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">User</p></div>}
          </div>
          <Link to="/" className={`flex items-center px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${!sidebarOpen && 'justify-center px-3'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7" /></svg>{sidebarOpen && <span className="ml-3 font-medium">Back to Store</span>}</Link>
          <button onClick={handleLogout} className={`flex items-center w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2 ${!sidebarOpen && 'justify-center px-3'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4" /></svg>{sidebarOpen && <span className="ml-3 font-medium">Logout</span>}</button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={closeMobileMenu}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 text-white dark:text-gray-200 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-lg">E</span></div>
                <span className="text-xl font-bold">E-Shop</span>
              </div>
              <button onClick={closeMobileMenu} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={closeMobileMenu} className={`flex items-center px-4 py-3 rounded-xl transition-all ${activeMenu === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  <span className="ml-3 font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7" /></svg><span className="ml-3 font-medium">Back to Store</span></Link>
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4" /></svg><span className="ml-3 font-medium">Logout</span></button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 w-full pt-16 lg:pt-0 min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:pl-64 xl:pl-72' : 'lg:pl-20'}`}>
        <div className="p-3 sm:p-4 xl:p-6 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}