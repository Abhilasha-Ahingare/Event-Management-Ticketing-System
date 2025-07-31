import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../context/utils/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [ticketInfo, setTicketInfo] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return;

      try {
        const { data } = await api.post(`/payment/verify-payment`, {
          sessionId,
        });
        setTicketInfo(data.ticketInfo);
        console.log(data.ticketInfo);
      } catch (err) {
        console.error("❌ Payment verification failed:", err.message);
      }
    };

    verifyPayment();
  }, []);

  if (!ticketInfo) return <div>🔄 Verifying payment...</div>;

  return (
    // <div className="max-w-2xl mx-auto p-4 text-center">
    //   <h1 className="text-3xl font-bold text-green-600">
    //     ✅ Payment Successful!
    //   </h1>
    //   {/* {ticketInfo.map((ticket, index) => (
    //     <div key={index} className="bg-white p-4 shadow-md rounded mb-4">
    //       <p>
    //         <strong>Event:</strong> {ticket.eventId.title}
    //       </p>
    //       <p>
    //         <strong>Date:</strong>{" "}
    //         {new Date(ticket.eventId.date).toLocaleString()}
    //       </p>
    //       <p>
    //         <strong>Location:</strong> {ticket.eventId.location}
    //       </p>
    //       <p>
    //         <strong>Quantity:</strong> {ticket.quantity}
    //       </p>
    //       <p>
    //         <strong>Total Paid:</strong> ₹{ticket.totalPrice}
    //       </p>
    //       <p>
    //         <strong>Status:</strong> {ticket.paymentStatus}
    //       </p>
    //       {ticket.qrCode && (
    //         <img src={ticket.qrCode} alt="QR Code" className="mt-2 w-32 h-32" />
    //       )}
    //     </div>
    //   ))} */}
    //   <p className="mt-2">
    //     Ticket sent to your email and saved in your account.
    //   </p>

    //   <div className="mt-6 flex justify-center gap-4">
    //     <button
    //       onClick={() => navigate("/tickets")}
    //       className="bg-blue-600 text-white px-4 py-2 rounded"
    //     >
    //       🎟 View My Tickets
    //     </button>
    //     <button
    //       onClick={() => navigate("/")}
    //       className="border px-4 py-2 rounded"
    //     >
    //       🏠 Back to Home
    //     </button>
    //   </div>
    // </div>
    <>sucess</>
  );
};

export default PaymentSuccess;
