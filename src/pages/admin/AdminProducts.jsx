import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", originalPrice: "", image: "", category: "", inStock: true, discount: "" });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/products`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = editingProduct ? `${API_URL}/admin/products/${editingProduct._id}` : `${API_URL}/admin/products`;
      const method = editingProduct ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(formData) });
      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: "", description: "", price: "", originalPrice: "", image: "", category: "", inStock: true, discount: "" });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/admin/products/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, description: product.description, price: product.price, originalPrice: product.originalPrice || "", image: product.image, category: product.category, inStock: product.inStock, discount: product.discount || "" });
    setShowModal(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">{products.length} products in your store</p>
        </div>
        <button onClick={() => { setEditingProduct(null); setFormData({ name: "", description: "", price: "", originalPrice: "", image: "", category: "", inStock: true, discount: "" }); setShowModal(true); }} className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all w-full sm:w-auto">
          + Add Product
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-gray-700/50 w-full">
            <div className="flex gap-3">
              <img src={product.image} alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm sm:text-base truncate">{product.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{product.category}</p>
                <div className="flex items-center gap-2 mt-1 sm:mt-2">
                  <span className="text-white font-bold text-sm sm:text-base">${product.price}</span>
                  {product.originalPrice && <span className="text-gray-500 text-xs sm:text-sm line-through">${product.originalPrice}</span>}
                </div>
                <span className={`inline-block mt-1 sm:mt-2 px-2 py-1 rounded-lg text-xs ${product.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleEdit(product)} className="flex-1 py-2 sm:py-2.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs sm:text-sm hover:bg-blue-500/30 transition-all">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="flex-1 py-2 sm:py-2.5 bg-red-500/20 text-red-400 rounded-lg text-xs sm:text-sm hover:bg-red-500/30 transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/30">
              <tr>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Product</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Category</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Price</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Stock</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-700/20 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover" />
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">${product.price}</span>
                    {product.originalPrice && <span className="ml-2 text-gray-500 line-through">${product.originalPrice}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm ${product.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleEdit(product)} className="px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all text-sm">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && <div className="p-8 text-center text-gray-500">No products yet</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl my-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">{editingProduct ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" required />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" rows="3" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-300 mb-2">Price</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" required />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Original Price</label>
                  <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image URL</label>
                <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" required />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Discount %</label>
                  <input type="number" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })} className="w-5 h-5 rounded" />
                <label className="text-gray-300">In Stock</label>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">{editingProduct ? "Update" : "Create"}</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}