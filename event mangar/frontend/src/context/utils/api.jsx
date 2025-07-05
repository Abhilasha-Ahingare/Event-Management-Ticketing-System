import axios from "axios";
// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.SERVER_URL || "http://localhost:4001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
