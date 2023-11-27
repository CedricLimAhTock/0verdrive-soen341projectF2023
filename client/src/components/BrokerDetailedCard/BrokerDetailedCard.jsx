import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BrokerDetailedCard.css";
import profileIcon from "../../assets/profile-picture.png";
import jwt_decode from "jwt-decode";
import PropertyCardCarousel from "../PropertyCardCarousel/PropertyCardCarousel";
const BrokerDetailedCard = ({ broker }) => {
  const navigate = useNavigate();
  const { user, email, phone, agency, id, license_number } = broker;

  const { firstname, lastname } = user;
  const [properties, setProperties] = useState([]);
  const [decodedToken, setDecodedToken] = React.useState(null);
  const [message, setMessage] = useState("");

  const fetchProperties = async () => {
    const response = await axios.get(
      `http://localhost:8080/property/broker/${id}`
    );

    const dataWithImages = response.data.map((property) => {
      if (!property.images || property.images.length === 0) {
        property.images = [
          {
            original:
              "https://www.vanulaw.com/wp-content/uploads/2017/10/house-03.jpg",
          },
          {
            original:
              "https://www.rismedia.com/wp-content/uploads/2021/03/luxury_real_estate_1150278000-1-750x435.jpg",
          },
        ];
      }
      return property;
    });

    setProperties(dataWithImages);
  };

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("jwtToken");
      setDecodedToken(
        token ? jwt_decode(localStorage.getItem("jwtToken")) : null
      );
    }

    fetchData();
    fetchProperties();
  }, []);

  const description =
    "A hard working broker that strives to give the best and nothing less.";
  const name = firstname + " " + lastname;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(decodedToken);
    if (!decodedToken) {
      alert("Please login to contact broker");
      navigate("/signin");
      return;
    }
    const parent_id = decodedToken.id || null;
    const user_id = broker.user_id;
    console.log({ parent_id, user_id, message });
    let response;
    if (message === "") {
      alert("Please enter a message");
      return;
    }
    if (!parent_id) {
      alert("Please login to contact broker");
      navigate("/signin");
      return;
    }
    try {
      response = await axios.post("http://localhost:8080/message", {
        parent_id: parent_id,
        user_id: user_id,
        message: message,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    if (response && response.status === 200) {
      alert("Form submitted");
      console.log(response);
    } else {
      console.log(response);
      console.log("Failed to submit form");
    }
  };

  return (
    <>
      <div className="broker-details">
        <div className="broker-left-side">
          <div className="profile-broker">
            <img src={profileIcon} className="detailed-profilepic" />
          </div>
          <div className="broker-info">
            <p className="broker-name">{name}</p>
            <p className="broker-email">{email}</p>
            <p className="broker-phone">{phone}</p>
            <p className="broker-agency">Agency: {agency}</p>
            <p className="broker-license">License: {license_number}</p>
            <p className="broker-desc">{description}</p>
          </div>
        </div>

        <div className="broker-right-side">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Contact {firstname} for More Info</h3>
            {/* <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" /> */}
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="carousel-properties">
        <PropertyCardCarousel properties={properties} />
      </div>
    </>
  );
};

export default BrokerDetailedCard;
