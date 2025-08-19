import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import api from "../../context/utils/api"; // Axios wrapper

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); 


  // 🔄 Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/auth/get-all-user`);
        // console.log(res.data.users);
        setUsers(res.data.users || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const UserDeleted = async (userId) => {
    try {
      const res = await api.delete(`/delete-user/${userId}`);
      if (res.status === 200) {
        alert("User deleted");
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  // 🧾 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-600 text-xl">
        Loading Users...
      </div>
    );
  }

  return (
    <section className="w-full h-auto px-4 py-6 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User List</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.Username || user.name}
                  </td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-4 px-4 capitalize">{user.role}</td>
                  <td className="py-4 px-4 flex items-center justify-center gap-4 text-xl text-gray-600">
                    <button
                      onClick={() => UserDeleted(user._id)}
                      title="Delete"
                      className="hover:text-red-600 transition"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserList;
