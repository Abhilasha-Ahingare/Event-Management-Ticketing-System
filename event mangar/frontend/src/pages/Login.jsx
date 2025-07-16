import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";
import api from "../context/utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = UserAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/auth/login`, { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);

      alert("Login successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Try again.");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm m-4"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-medium mb-2">Welcome Back! 💬</h2>
          <p className="text-center text-gray-600 mb-6 uppercase">
            Enter your email and password
          </p>
        </div>

        <div className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 uppercase"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              placeholder="Enter your email id"
              autoComplete="new-password"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2 uppercase"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-950"
              minLength="6"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors font-serif"
          >
            Login
          </button>
        </div>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/registration" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
