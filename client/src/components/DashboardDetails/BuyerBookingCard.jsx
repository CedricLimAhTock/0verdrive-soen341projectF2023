import React from 'react';
import './styles/Bookings.css';

const BuyerBookingCard = ({ data, expanded, toggleExpand }) => {
  const { type, status, address, price, broker } = data;

  const statusMap = {
    confirmed: 'status-confirmed',
    hold: 'status-hold',
    declined: 'status-declined',
  };

  const statusName = statusMap[status] || 'status-hold';
  const expand = () => {
    toggleExpand();
    console.log('expand');
  }
  return (
    <div className="buyer-booking-card" onClick={() => expand(event)}>
      <div className="property-type">{type}</div>
      <div className={`property-status ${statusName}`}>{status}</div>
      <div className="property-address">{address}</div>
      <div className="property-price">{price}</div>
      <div className="property-broker">{broker}</div>
      {/* Date probably */}
      {expanded && (
        <span className="expanded-content">
            <h1>Expanded Content</h1>
        </span>
      )}
    </div>
  );
};


export default BuyerBookingCard;
