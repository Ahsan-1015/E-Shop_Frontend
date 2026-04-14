import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard", path: "/admin" },
  { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4l-8 4m8-4l8 4", label: "Products", path: "/admin/products" },
  { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Users", path: "/admin/users" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 9h9", label: "Orders", path: "/admin/orders" },
];

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("/admin");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      
      {/* Mobile Header - Hidden on lg+ */}
      <header className="lg:hidden sticky top-0 z-40 bg-gray-800/95 backdrop-blur-xl border-b border-gray-700/50 h-16 flex items-center justify-between px-4">
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-gray-700 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">E</span></div>
          <span className="text-white font-bold text-lg">Admin</span>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Desktop Sidebar - Fixed for lg+ */}
      <aside className={`hidden lg:flex flex-col ${sidebarOpen ? 'w-64 xl:w-72' : 'w-20'} bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 text-white fixed h-full z-10 transition-all duration-300`}>
        <div className="h-16 xl:h-20 flex items-center justify-between border-b border-gray-700/50 px-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-lg">E</span></div>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto"><span className="text-white font-bold text-lg">E</span></div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-700 rounded-lg text-gray-300">
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} /></svg>
          </button>
        </div>
        <nav className={`p-4 space-y-2 flex-1 overflow-y-auto ${!sidebarOpen && 'px-2'}`}>
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setActiveMenu(item.path)} className={`flex items-center px-4 py-3 rounded-xl transition-all ${activeMenu === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600" : "hover:bg-gray-700/50"} ${!sidebarOpen && 'justify-center px-3'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className={`p-4 border-t border-gray-700/50 ${!sidebarOpen && 'px-2'}`}>
          <div className={`flex items-center px-4 py-3 rounded-xl ${!sidebarOpen ? 'justify-center' : ''}`}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center"><span className="text-white font-bold">{user?.name?.charAt(0).toUpperCase()}</span></div>
            )}
            {sidebarOpen && <div className="ml-3"><p className="font-medium text-sm">{user?.name}</p><p className="text-xs text-gray-400">Admin</p></div>}
          </div>
          <Link to="/" className={`flex items-center px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-all ${!sidebarOpen && 'justify-center px-3'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7" /></svg>{sidebarOpen && <span className="ml-3 font-medium">Back to Store</span>}</Link>
          <button onClick={handleLogout} className={`flex items-center w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 mt-2 ${!sidebarOpen && 'justify-center px-3'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4" /></svg>{sidebarOpen && <span className="ml-3 font-medium">Logout</span>}</button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={closeMobileMenu}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-gray-800 text-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-lg">E</span></div>
                <span className="text-xl font-bold">Admin Panel</span>
              </div>
              <button onClick={closeMobileMenu} className="p-2 hover:bg-gray-700 rounded-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={closeMobileMenu} className={`flex items-center px-4 py-3 rounded-xl transition-all ${activeMenu === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600" : "hover:bg-gray-700/50"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  <span className="ml-3 font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-gray-700 space-y-2">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center px-4 py-3 rounded-xl hover:bg-gray-700/50 transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7" /></svg><span className="ml-3 font-medium">Back to Store</span></Link>
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4" /></svg><span className="ml-3 font-medium">Logout</span></button>
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