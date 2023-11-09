import React, { useState } from "react";
import "./styles/Dashboard.css";
import Profile from "../components/DashboardDetails/Profile";
import Favorites from "../components/DashboardDetails/Favorites";
import Bookings from "../components/DashboardDetails/Bookings";
import OffersMade from "../components/DashboardDetails/OffersMade";
import ReceivedOffers from "../components/DashboardDetails/ReceivedOffers";
import Listings from "../components/DashboardDetails/Listings";
import Users from "../components/DashboardDetails/Users";

const Dashboard = ({ token }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
    console.log("Logged out successfully");
  };

  const data = {
    price: "$1,000,000",
    address: "1234 Main St, San Diego, CA 92101",
    bedrooms: 3,
    bathrooms: 2,
    size: 2000,
    firstName: "John",
    lastName: "Doe",
    email: "gay@gmail.com",
    phone: "123-456-7890",
  };

  // For temporary use, need to be replaced with role in token
  const userRole = "admin";

  const tabsByRole = {
    homebuyer: ["Profile", "Favorites"],
    renter: ["Profile", "Favorites"],
    broker: [
      "Profile",
      "Favorites",
      "Offers Made",
      "Received Offers",
      "Listings",
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
          {activeTab === "profile" && <Profile data={data} token={token} />}
          {activeTab === "favorites" && <Favorites token={token} />}
          {activeTab === "bookings" && <Bookings data={data} token={token} />}
          {activeTab === "offers made" && <OffersMade token={token} />}
          {activeTab === "received offers" && <ReceivedOffers token={token} />}
          {activeTab === "listings" && <Listings token={token} />}
          {activeTab === "users" && <Users token={token} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
