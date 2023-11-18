import React from "react";
import "./styles/Bookings.css";
import FormatNumber from "../FormatNumber/FormatNumber";
const BuyerBookingCard = ({ data, expanded, toggleExpand }) => {
  const { type, status, address, price, broker } = data;

  const statusMap = {
    confirmed: "status-confirmed",
    hold: "status-hold",
    declined: "status-declined",
  };

  const statusName = statusMap[status] || "status-hold";
  const expand = () => {
    toggleExpand();
    console.log("expand");
  };
  return (
    <div className="whole-card" onClick={() => expand(event)}>
      <div className="buyer-booking-card">
        <div className="property-type">{type}</div>
        <div className={`property-status ${statusName}`}>{status}</div>
        <div className="property-address">{data.message}</div>
        <div className="property-price">${FormatNumber(price)}</div>
        <div className="property-broker">{broker}</div>
        {/* Date probably */}
      </div>
      {expanded && (
        <div className="expanded-content">
          <h1>Expanded Content</h1>
        </div>
      )}
    </div>
  );
};

export default BuyerBookingCard;
