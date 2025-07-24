import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";
import api from "../context/utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, StoreToken, isLogIn } = UserAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/auth/login`, { email, password });
      StoreToken(data.token);
      setUser(data.user);

      alert("Login successful!");
      if (isLogIn && user) {
        if (user.role === "admin") navigate("/get_admin");
        else if (user.role === "organizer") navigate("/dashboard");
        else navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Try again.");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Welcome Back! 💬
          </h2>
          <p className="text-gray-600 uppercase tracking-wide text-sm">
            Login to your account
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              placeholder="Enter your password"
              minLength="6"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/registration"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
