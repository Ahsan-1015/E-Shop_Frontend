import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setMessage("Profile updated successfully!");
      } else {
        const data = await response.json();
        setError(data.message || "Error updating profile");
      }
    } catch (err) {
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div className="relative inline-block">
              {formData.photoURL ? (
                <img src={formData.photoURL} alt={user?.name} className="w-28 h-28 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg" />
              ) : (
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
                  <span className="text-4xl text-white font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <label className="absolute bottom-1 right-1 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl cursor-pointer hover:shadow-lg transition-all">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 7H17a2 2 0 012 2v9.34A2 2 0 0115 18.66H9.34A2 2 0 017.66 17H7a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, photoURL: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo URL</label>
              <input type="text" value={formData.photoURL} onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })} placeholder="https://example.com/photo.jpg" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
            </div>

            {message && <p className="text-green-500 text-sm font-medium">{message}</p>}
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}