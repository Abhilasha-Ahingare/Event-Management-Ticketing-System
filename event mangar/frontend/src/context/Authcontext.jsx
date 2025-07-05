import { createContext, useContext, useState, useEffect } from "react";
import api from "../context/utils/api";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const Authorization = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLogIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const UserAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/auth/user`, { withCredentials: true });
      if (response.status === 200) {
        const data = await response.json();
        // Make sure to set user to the user object with a role property
        setUser(data.user || data); // adjust as per your backend response
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      setUser(null);
      setIsLoading(false);
    }
  };

  const [Events, setEvents] = useState([]);

  const GetEvents = async () => {
    try {
      const response = await api.get(`/api/event/get-all-event`);
      if (response.status(200)) {
        const Events = await response.json();
        // console.log(Events);
        setEvents(Events);
      }
    } catch (error) {
      // console.error("events error", error);
    }
  };

  useEffect(() => {
    GetEvents();
    UserAuthentication();
  }, []);
  return (
    <Authcontext.Provider
      value={{
        LogoutUser,
        storeToken,
        user,
        isLoading,
        isLogIn,
        Authorization,
        Events
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
