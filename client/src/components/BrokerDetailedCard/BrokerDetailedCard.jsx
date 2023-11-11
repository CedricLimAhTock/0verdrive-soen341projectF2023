import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BrokerDetailedCard.css";
import profileIcon from "../../assets/profile-picture.png";
import jwt_decode from "jwt-decode";
import PropertyCardCarousel from "../PropertyCardCarousel/PropertyCardCarousel";

const BrokerDetailedCard = ({ broker }) => {
  const { user, email, phone, agency, id, license_number } = broker;

  const { firstname, lastname } = user;
  const [properties, setProperties] = useState([]);
  const [decodedToken, setDecodedToken] = React.useState(null);

  const fetchProperties = async () => {
    const response = await axios.get(
      `http://localhost:8080/property/broker/${id}`
    );

    const dataWithImages = response.data.map((property) => {
      if (!property.images || property.images.length === 0) {
        property.images = [
          {
            original: "https://picsum.photos/id/1018/1000/600/",
          },
        ];
      }
      return property;
    });

    setProperties(dataWithImages);
  };

  useEffect(() => {
    function fetchData() {
      //const token = localStorage.getItem("jwtToken");
      const decoded = null;
      setDecodedToken(decoded);
    }

    fetchData();
    fetchProperties();
  }, []);

  const description =
    "A hard working broker that strives to give the best and nothing less.";
  const name = firstname + " " + lastname;

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
          <form className="contact-form">
            <h3>Contact {firstname} for More Info</h3>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message" />
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
