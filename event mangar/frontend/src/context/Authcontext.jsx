import { createContext, useContext, useState, useEffect } from "react";
import api from "../context/utils/api";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [ticket, setTicket] = useState([]);

  const authorization = `Bearer ${token}`;
  const isLogIn = !!token;

  const StoreToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const logout = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
  };

  const UserAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/auth/user`, {
        headers: { Authorization: authorization },
        withCredentials: true,
      });
      if (response.status === 200) {
        // console.log(response.data.user);
        setUser(response.data.user);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("🚫 Error fetching user:", error);
      logout();
      setIsLoading(false);
    }
  };

  const getEvents = async () => {
    try {
      const response = await api.get(`/event/get-all-event`);
      if (response.status === 200) {
        // console.log("Fetched events:", response.data.getevents);
        setEvents(response.data.getevents);
      }
    } catch (error) {
      console.error("Events not found", error);
    }
  };

  const getTicket = async () => {
    try {
      const response = await api.get(`/tickets/get-my-tickets`);
      if (response.status === 200) {
        // console.log("Fetched tickets array:", response.data.tickets);
        setTicket(response.data.tickets);
        // Optionally, log the updated state
        // setTimeout(() => console.log("Updated ticket state:", ticket), 0);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      UserAuthentication();
      getEvents();
      getTicket();
    } else {
      logout();
    }
  }, [token]);

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
        isLogIn,
        ticket,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const UserAuth = () => useContext(Authcontext);
export default Authcontext;
