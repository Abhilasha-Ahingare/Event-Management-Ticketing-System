import React from "react";
import { UserAuth } from "../context/Authcontext";

const MyTickets = () => {
  const { ticket } = UserAuth();
  return <div>MyTickets</div>;
};

export default MyTickets;
