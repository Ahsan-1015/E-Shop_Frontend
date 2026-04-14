import { useEffect, useState } from "react";
import { swal } from "../../utils/swal";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    const confirmed = await swal.delete(userName || "this user");
    if (!confirmed) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/admin/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      swal.success("Deleted!", "User has been deleted.");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleBlock = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/admin/users/${id}/block`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Users</h1>
        <p className="text-gray-400 mt-1">{users.length} registered users</p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{user.name}</h3>
                <p className="text-gray-400 text-sm truncate">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-lg text-xs ${user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {user.role}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs ${user.isBlocked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleBlock(user._id)} className={`flex-1 py-2 rounded-lg text-sm transition-all ${user.isBlocked ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"}`}>
                {user.isBlocked ? "Unblock" : "Block"}
              </button>
              <button onClick={() => handleDelete(user._id, user.name)} className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-all">Delete</button>
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
                <th className="px-6 py-4 text-left text-gray-300 font-medium">User</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Email</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Role</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Status</th>
                <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700/20 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.name} className="w-12 h-12 rounded-xl object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm ${user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-gray-500/20 text-gray-400"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm ${user.isBlocked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleBlock(user._id)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${user.isBlocked ? "text-green-400 hover:text-green-300 hover:bg-green-500/10" : "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"}`}>
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button onClick={() => handleDelete(user._id, user.name)} className="px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && <div className="p-8 text-center text-gray-500">No users yet</div>}
      </div>
    </div>
  );
}