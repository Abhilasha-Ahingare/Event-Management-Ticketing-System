// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../context/utils/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [ticketInfo, setTicketInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return;

      try {
        const res = await api.post(`/payment/verify-payment`, {
          sessionId: sessionId._id,
        });
        setTicketInfo(res.data.ticketInfo);
      } catch (err) {
        console.error("Payment verification failed", err);
      }
    };
    verifyPayment();
  }, [searchParams]);

  if (!ticketInfo) return <div>Verifying payment...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Payment Successful!
      </h1>
      <p className="mt-2 text-gray-700">
        Thank you for booking. You have successfully purchased{" "}
        <strong>{ticketInfo.quantity}</strong> ticket(s) for{" "}
        <strong>{ticketInfo.eventName}</strong>.
      </p>
      <p className="mt-2">
        Your ticket has been emailed to you and is also available in your
        account.
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => navigate("/my-tickets")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          🎟 View My Tickets
        </button>
        <button
          onClick={() => navigate("/")}
          className="border px-4 py-2 rounded"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
