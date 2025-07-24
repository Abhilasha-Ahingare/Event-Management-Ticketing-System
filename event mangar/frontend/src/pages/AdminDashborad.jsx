import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { BiDollar } from "react-icons/bi";
import { UserAuth } from "../context/Authcontext";
import api from "../context/utils/api";
import Example from "../Dashboard/admin/ChartTwo";
import AdminChart from "../Dashboard/admin/AdminChart";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const AdminDashboard = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchAdminData = async () => {
    try {
      const response = await api.get(`/admin/get_admin`);
      if (response.status === 200) {
        setAdmin(response.data.admindata);
      }
    } catch (error) {
      console.log("Admin error", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleCreateUser = () => navigate("/registration");

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <section className="w-full min-h-screen flex bg-gray-100 relative">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-10 left-75 z-50 md:hidden text-3xl text-gray-900"
      >
        {sidebarOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 transition-transform duration-300 bg-gray-900 text-white min-h-screen p-6 w-[250px] shadow-lg ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center">
              🎯 Admin Panel
            </h1>
            <nav className="flex flex-col gap-3">
              <Link
                to="/get-all-user"
                className="hover:bg-gray-100 hover:text-black px-4 py-2 rounded transition"
              >
                🙋 Total Users
              </Link>
              <Link
                to="/Event-list"
                className="hover:bg-gray-100 hover:text-black px-4 py-2 rounded transition"
              >
                📅 Total Events
              </Link>
              <Link
                to="/tickets-list"
                className="hover:bg-gray-100 hover:text-black px-4 py-2 rounded transition"
              >
                🎟️ Total Tickets
              </Link>
              <Link
                to="/get_admin"
                className="hover:bg-gray-100 hover:text-black px-4 py-2 rounded transition"
              >
                💰 Total Revenue
              </Link>
            </nav>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-700 to-indigo-500 text-white font-semibold py-2 px-4 rounded hover:scale-105 transition w-full mt-6"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:text-center  mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl md:text-center font-bold text-blue-900 uppercase">
            Event Task Management 👩🏻‍💻
          </h2>
          <Button
            onClick={handleCreateUser}
            className="bg-gradient-to-r from-gray-700 to-blue-500 text-white py-2 px-4 rounded-lg shadow hover:scale-105 transition flex items-center gap-2"
          >
            <IoMdAdd className="text-xl" />
            Create User
          </Button>
        </div>

        {/* Dashboard Cards */}
        {Array.isArray(admin) && admin.length >= 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white w-full  h-[180px] p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ">
              <h3 className="flex items-center justify-between text-lg font-semibold text-gray-700 mb-2">
                Total Events
                <TiHomeOutline className="text-xl text-green-700" />
              </h3>
              <span className="text-3xl font-bold text-gray-900">
                {admin[1]}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                You’ve organized 125 events so far.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white w-full h-[180px] p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="flex items-center justify-between text-lg font-semibold text-gray-700 mb-2">
                Total User
                <IoTicketOutline className="text-xl text-yellow-600" />
              </h3>
              <span className="text-3xl font-bold text-gray-900">
                {admin[0]}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                Total across all events.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white w-full h-[180px] p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="flex items-center justify-between text-lg font-semibold text-gray-700 mb-2">
                Revenue
                <BiDollar className="text-xl text-blue-700" />
              </h3>
              <span className="text-3xl font-bold text-gray-900">
                ₹ {admin[3]}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                Revenue from ticket sales.
              </p>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 mt-6">
          <AdminChart />
          <Example />
        </div>
      </main>
    </section>
  );
};

export default AdminDashboard;
