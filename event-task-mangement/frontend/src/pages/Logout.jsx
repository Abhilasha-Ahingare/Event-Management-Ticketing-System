import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
    navigate("/login");
  });
};

export default Logout;
