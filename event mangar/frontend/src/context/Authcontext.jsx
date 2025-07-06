import { createContext, useContext, useState, useEffect } from "react";
import api from "../context/utils/api";
import { useNavigate } from "react-router-dom";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Check user on first load
  const checkUser = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/auth/user");
      // console.log("✅ Fetched user from backend:", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      // console.log("🚫 Error fetching user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Authcontext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        isLoading,
        logout,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(Authcontext);
};
export default Authcontext;
