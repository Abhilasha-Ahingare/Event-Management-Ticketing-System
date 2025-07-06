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
      console.error("registration failed", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm m-4"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-medium mb-2">hey there ! 🙋🏻‍♀️</h2>
          <p className="text-center text-gray-600 mb-6 uppercase">
            Create your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-semibold mb-2 uppercase"
            >
              Username
            </label>
            <input
              type="text"
              value={Username}
              name="Username"
              id="Username"
              placeholder="Enter your Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-500"
              required
            />
          </div>
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-500"
              required
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-500"
              minLength="6"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-semibold mb-2 uppercase"
            >
              Register as
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:right-2 focus:ring-blue-500"
              required
            >
              <option value="user">user</option>
              <option value="organizer">organizer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors font-serif"
          >
            Register
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-600">you have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
