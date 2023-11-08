import React from "react";
import "./styles/DashboardOffers.css";

const OfferCard = ({ offer, expanded, toggleExpand }) => {

  data = offer;
  const statusMap = {
    wait: "status-wait",
    acknowledge: "status-acknowledge",
    review: "status-review",
    accept: "status-accept",
    deny: "status-deny",
    other: "status-other",
  };

  const statusName = statusMap[status] || "status-other";

  const expand = () => {
    toggleExpand();
    console.log("expand");
  };

  return (
    <div className="whole-card" onClick={() => expand()}>
      <div className="offer-card">
        <div className="property-type">Test</div>
        <div className={`property-status ${statusName}`}>{data.status}</div>
        <div className="property-address">{data.property.city}</div>
        <div className="property-price">${price}</div>
        <div className="property-broker">{data.user.firstname} {data.user.lastname}</div>
        {/* Additional details can be added here, such as date, deed, etc. */}
      </div>
      {expanded && (
        <div className="expanded-content">
          {/* You can display additional information when expanded */}
          <h1>Expanded Content</h1>
        </div>
      )}
    </div>
  );
};

export default OfferCard;
