import React from "react";
import { Button } from "../components/ui/button";
import { UserAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoading, logout } = UserAuth();
  const navigate = useNavigate();

  // Logout handler with redirect
  const logouthandler = async () => {
    await logout(); // Assuming logout is async
    navigate("/login");
  };

  // Loading UI
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse text-white">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#576475] via-[#334155] to-[#4b6679] flex items-center justify-center p-4">
      <div className="animate-fadeIn w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 transition-all duration-300 hover:scale-[0.98]">
        {/* Avatar */}
        <div
          className={`w-20 h-20 mx-auto rounded-full shadow-md flex items-center justify-center text-3xl font-bold uppercase bg-gray-500/55 text-gray-300`}
        >
          {user?.Username?.slice(0, 1) || "U"}
        </div>

        {/* Info Form */}
        <form className="flex flex-col gap-5 text-slate-100">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-1 uppercase tracking-wide"
            >
              User Name
            </label>
            <input
              type="text"
              name="username"
              value={user?.Username || ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-slate-100 text-gray-800 shadow-2xl shadow-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 uppercase tracking-wide"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-slate-100 text-gray-800 shadow-2xl shadow-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold mb-1 uppercase tracking-wide"
            >
              Role
            </label>
            <input
              type="text"
              name="role"
              value={user?.role || ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-slate-100 text-gray-800 shadow-2xl shadow-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </form>

        {/* Logout Button */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={logouthandler}
            className="bg-gradient-to-r from-gray-700 to-sky-700 text-white font-semibold py-3 px-8 rounded-xl shadow hover:scale-105 transition-transform duration-200 hover:to-sky-800 focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            Logout
          </Button>
          <Button
            onClick={logouthandler}
            className="bg-gradient-to-r from-gray-700 to-sky-700 text-white font-semibold py-3 px-8 rounded-xl shadow hover:scale-105 transition-transform duration-200 hover:to-sky-800 focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
