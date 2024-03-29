import React, { useState } from "react";
import "./styles/Dashboard.css";
import Profile from "../components/DashboardDetails/Profile";
import Favorites from "../components/DashboardDetails/Favorites";
import Bookings from "../components/DashboardDetails/Bookings";
import OffersMade from "../components/DashboardDetails/OffersMade";
import ReceivedOffers from "../components/DashboardDetails/ReceivedOffers";
import ReceivedBookings from "../components/DashboardDetails/RecievedBookings";
import Listings from "../components/DashboardDetails/Listings";
import Users from "../components/DashboardDetails/Users";
import jwt_decode from "jwt-decode";
import Messages from "../components/DashboardDetails/Messages";

const Dashboard = ({ token }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
    console.log("Logged out successfully");
  };

  // For temporary use, need to be replaced with role in token
  //const userRole = "broker";
  const jwt = localStorage.getItem("jwtToken");
  const decodedToken = jwt_decode(jwt);
  const userRole = decodedToken.role;

  const tabsByRole = {
    homebuyer: ["Profile", "Favorites"],
    renter: ["Profile", "Favorites"],
    broker: [
      "Profile",
      "Favorites",
      "Bookings",
      "Received Bookings",
      "Offers Made",
      "Received Offers",
      "Listings",
      "Messages",
    ],
    admin: ["Profile", "Favorites", "Users"],
  };

  const availableTabs = tabsByRole[userRole] || [];

  return (
    <div className="dashboard">
      <div className="sidebar">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab.toLowerCase() ? "active-tab" : ""}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-info">
        <div className="banner">
          <h2 className="title">{activeTab}</h2>
          <p className="path">Home/{activeTab}</p>
        </div>

        <div className="dashboard-data">
          {activeTab === "profile" && <Profile token={token} />}
          {activeTab === "favorites" && <Favorites token={token} />}
          {activeTab === "bookings" && <Bookings token={token} />}
          {activeTab === "received bookings" && (
            <ReceivedBookings token={token} />
          )}
          {activeTab === "offers made" && <OffersMade token={token} />}
          {activeTab === "received offers" && <ReceivedOffers token={token} />}
          {activeTab === "listings" && <Listings token={token} />}
          {activeTab === "users" && <Users token={token} />}
          {activeTab === "messages" && <Messages token={token} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
