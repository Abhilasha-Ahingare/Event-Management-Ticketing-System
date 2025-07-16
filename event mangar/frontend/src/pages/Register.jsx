import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";
import api from "../context/utils/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [Username, setUsername] = useState("");
  const navigate = useNavigate();
  const { setUser } = UserAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/registration`, {
        Username,
        email,
        password,
        role,
      });

      if (response.status === 201 && response.data) {
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        if (setUser) setUser(user);

        alert("Registration successful & logged in!");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-tr from-blue-50 to-purple-100 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Hey there! 🙋🏻‍♀️</h2>
          <p className="text-gray-600 uppercase tracking-wide text-sm">
            Create your account
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase">Username</label>
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              minLength="6"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase">Register as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Register
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
