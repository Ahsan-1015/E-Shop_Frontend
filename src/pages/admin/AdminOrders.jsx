import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400",
  processing: "bg-blue-500/20 text-blue-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};
const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/orders`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/admin/orders/${orderId}/status`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status: newStatus }) });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/admin/orders/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 mt-1">{orders.length} orders placed</p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-gray-400 text-xs">Order ID</p>
                <p className="text-white font-medium">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm ${statusColors[order.status]}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="mb-3">
              <p className="text-gray-400 text-sm">Customer</p>
              <p className="text-white">{order.user?.name}</p>
              <p className="text-gray-500 text-sm">{order.user?.email}</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-gray-400 text-sm">{order.items?.length} items</p>
              </div>
              <p className="text-xl font-bold text-white">${order.total?.toFixed(2)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className={`flex-1 px-3 py-2 rounded-lg text-sm border-0 cursor-pointer ${statusColors[order.status]} min-w-0`}>
                {statusOptions.map((status) => (<option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>))}
              </select>
              <button onClick={() => setSelectedOrder(order)} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-all">View</button>
              <button onClick={() => handleDelete(order._id)} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-all">Delete</button>
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
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Order ID</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Customer</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Items</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Total</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Status</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Date</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-700/20 transition-all">
                  <td className="px-6 py-4 text-gray-300 text-sm">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div className="text-white">{order.user?.name}</div>
                    <div className="text-gray-500 text-sm">{order.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{order.items?.length} items</td>
                  <td className="px-6 py-4 text-white font-bold">${order.total?.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className={`px-3 py-2 rounded-lg text-sm border-0 cursor-pointer ${statusColors[order.status]}`}>
                      {statusOptions.map((status) => (<option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedOrder(order)} className="px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all text-sm">View</button>
                      <button onClick={() => handleDelete(order._id)} className="px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && <div className="p-8 text-center text-gray-500">No orders yet</div>}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl my-8 border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                <p className="text-gray-400">#{selectedOrder._id.slice(-8).toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-700 rounded-xl">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-700">
                <div>
                  <p className="text-gray-400 text-sm">Customer</p>
                  <p className="text-white">{selectedOrder.user?.name}</p>
                  <p className="text-gray-400 text-sm">{selectedOrder.user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-3">Items</p>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-700/30 p-3 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{item.name}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <p className="text-white font-bold flex-shrink-0">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-700">
                <span className="text-lg text-gray-300">Total</span>
                <span className="text-lg font-bold text-white">${selectedOrder.total?.toFixed(2)}</span>
              </div>
              {selectedOrder.shippingAddress && (
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-2">Shipping Address</p>
                  <p className="text-white">{selectedOrder.shippingAddress.address}</p>
                  <p className="text-gray-400">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}