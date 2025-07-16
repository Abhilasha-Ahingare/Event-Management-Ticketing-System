import { createContext, useContext, useState, useEffect } from "react";
import api from "../context/utils/api";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authorization = `Bearer ${token}`;

  const StoreToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLogIn = !!token;
  // Logout function
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // Check user data
  const UserAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/auth/user`);
      // console.log("✅ Fetched user from backend:", response.data.user);
      if (response.ok) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("🚫 Error fetching user:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  //events
  const [events, setEvent] = useState([]);

  const getEvents = async () => {
    try {
      const response = await api.get(`/event/get-all-event`);
      if (response.status === 200) {
        console.log(response.data.getEvents);
        setEvent(response.data.getevents);
      }
    } catch (error) {
      console.error("event not find", error);
    }
  };

  useEffect(() => {
    UserAuthentication();
    getEvents();
  }, []);

  return (
    <Authcontext.Provider
      value={{
        user,
        setUser,
        StoreToken,
        authorization,
        isLoading,
        logout,
        events,
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
