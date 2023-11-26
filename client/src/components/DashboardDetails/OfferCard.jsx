import React from "react";
import "./styles/DashboardOffers.css";
import axios from "axios";
const OfferCard = ({ offer, expanded, toggleExpand }) => {
  const data = offer;

  const statusMap = {
    wait: "status-wait",
    acknowledge: "status-acknowledge",
    review: "status-review",
    accept: "status-accept",
    deny: "status-deny",
    other: "status-other",
  };

  const ButtonsFunc = (action) => {
    let choice = "";

    if (action === "wait") {
      choice = "wait";
    } else if (action === "acknowledge") {
      choice = "acknowledge";
    } else if (action === "review") {
      choice = "review";
    } else if (action === "accept") {
      choice = "accept";
    } else if (action === "deny") {
      choice = "deny";
    }
    axios
      .put(`http://localhost:8080/offer/${data.id}`, {
        status: choice,
      })
      .then((response) => {
        console.log(response);
        alert("Status changed");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const statusName = statusMap[data.status] || "status-other";

  const expand = () => {
    toggleExpand();
    console.log("expand");
  };

  return (
    <div className="whole-card" onClick={() => expand()}>
      <div className="offer-card">
        <div className={`property-status ${statusName}`}>{data.status}</div>
        <div className="property-address">{data.property.city}</div>
        <div className="property-price">${data.price}</div>
        <div className="property-broker">
          {data.user.firstname} {data.user.lastname}
        </div>
        {/* Additional details can be added here, such as date, deed, etc. */}
      </div>
      {expanded && (
        <div className="expanded-content three-buttons">
          <button
            className={`property-status status-wait`}
            onClick={() => ButtonsFunc("wait")}
          >
            Wait
          </button>
          <button
            className={`property-status status-acknowledge`}
            onClick={() => ButtonsFunc("acknowledge")}
          >
            Ackknowledge
          </button>
          <button
            className={`property-status status-review`}
            onClick={() => ButtonsFunc("review")}
          >
            Review
          </button>
          <button
            className={`property-status status-accept`}
            onClick={() => ButtonsFunc("accept")}
          >
            Accept
          </button>
          <button
            className={`property-status status-deny`}
            onClick={() => ButtonsFunc("deny")}
          >
            Deny
          </button>
        </div>
      )}
    </div>
  );
};

export default OfferCard;
