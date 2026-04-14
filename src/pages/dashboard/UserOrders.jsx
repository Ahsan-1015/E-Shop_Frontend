import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4l-8 4m8-4l8 4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No orders yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Start shopping to see your orders here</p>
        <Link to="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Orders</h1>
          <p className="text-gray-500">{orders.length} orders placed</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="text-gray-800 dark:text-white font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <span className={`px-4 py-2 rounded-xl text-sm font-medium ${statusColors[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">${order.total?.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 3).map((item, index) => (
                      <img key={index} src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-gray-800" />
                    ))}
                    {order.items?.length > 3 && (
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-500 border-2 border-white dark:border-gray-800">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500">{order.items?.length} items</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <button onClick={() => setSelectedOrder(order)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Order Details</h2>
                <p className="text-gray-500">#{selectedOrder._id.slice(-8).toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Order Date</p>
                  <p className="text-gray-800 dark:text-white">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-3">Items</p>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <p className="font-bold text-gray-800 dark:text-white">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-lg font-medium text-gray-600 dark:text-gray-300">Total</span>
                <span className="text-lg font-bold text-gray-800 dark:text-white">${selectedOrder.total?.toFixed(2)}</span>
              </div>

              {selectedOrder.shippingAddress && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-500 text-sm mb-2">Shipping Address</p>
                  <p className="text-gray-800 dark:text-white">{selectedOrder.shippingAddress.address}</p>
                  <p className="text-gray-500">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}