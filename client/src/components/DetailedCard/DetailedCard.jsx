import React, { useState, useEffect } from "react";
import template from "../../assets/slideshow-template.jpg";
import "./DetailedCard.css";
import bedIcon from "../../assets/bed.svg";
import bathIcon from "../../assets/bath.svg";
import rulerIcon from "../../assets/ruler.svg";
import MortgageCalculator from "../MortgageCalculator/MortgageCalculator";
import Carousel from "../Carousel/Carousel";
import VisitForm from "../VisitForm/VisitForm";
import OfferForm from "../OfferForm/OfferForm";
import jwt_decode from "jwt-decode";
import axios from "axios";
import FormatNumber from "../FormatNumber/FormatNumber";
import BrokerCard from "../BrokerCard/BrokerCard";

const DetailedCard = ({ property }) => {
  const {
    images,
    price,
    street,
    city,
    province,
    country,
    num_bedrooms,
    num_bathrooms,
    property_area,
    neighbourhood,
    id,
  } = property;

  const [decodedToken, setDecodedToken] = React.useState(null);
  const [brokerInfo, setBrokerInfo] = useState(null);
  const [broker, setBroker] = useState(null);

  useEffect(() => {
    function fetchData() {
      //const token = localStorage.getItem("jwtToken");
      const decoded = null;
      setDecodedToken(decoded);
    }

    const fetchBroker = async () => {
      const response = await axios.get(
        `http://localhost:8080/broker/property/${id}`
      );

      setBroker(response.data);
      const { user } = response.data;
      const { firstname, lastname } = user;
      const broker = firstname + " " + lastname;
      setBrokerInfo(broker);
      console.log(broker);
    };

    fetchData();
    fetchBroker();
  }, []);

  const address = `${street}, ${city}, ${province}, ${country}`;
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui.";

  const [activeTab, setActiveTab] = useState("description");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVisitForm, setVisitForm] = useState(false);
  const [isOfferForm, setOfferForm] = useState(false);

  const toggleVisitForm = () => {
    setVisitForm(!isVisitForm);
  };

  const toggleForm = () => {
    console.log("toggleForm");
    setIsFormOpen(!isFormOpen);
  };

  const toggleOfferForm = () => {
    setOfferForm(!isOfferForm);
  };

  return (
    <div className="details">
      <div className="left-side">
        <div className="images">
          <Carousel images={images} className="carousel-detailed" />
        </div>

        <div className="info">
          <h2 className="title">${FormatNumber(price)}</h2>
          <p className="address">{address}</p>
        </div>

        <div className="tabs">
          <div className="property-tabs">
            <button
              className={activeTab === "description" ? "active-tab" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "map" ? "active-tab" : ""}
              onClick={() => setActiveTab("map")}
            >
              Map
            </button>
          </div>
          <div className="property-details">
            {broker && activeTab === "description" && (
              <>
                <p>{description}</p>
                <br />
                <p>Neighbourhood: {neighbourhood}</p>
                <br />
                <BrokerCard broker={broker} />
              </>
            )}

            {activeTab === "map" && <p>{address}</p>}
          </div>
        </div>

        <b>Features</b>
        <div className="property-features">
          <div className="features">
            <img className="c-icons" src={bedIcon} alt="Bed Icon" />
            <span className="icon-numbers">{num_bedrooms}</span>
          </div>
          <div className="features">
            <img className="c-icons" src={bathIcon} alt="Bath Icon" />
            <span className="icon-numbers">{num_bathrooms}</span>
          </div>
          <div className="features">
            <img className="c-icons" src={rulerIcon} alt="Ruler Icon" />
            <span className="icon-numbers">
              {FormatNumber(property_area)} sq ft
            </span>
          </div>
        </div>
      </div>

      <div className="right-side">
        <h2 className="price">${FormatNumber(price)}</h2>
        <button
          className="offer offer-button"
          onClick={() => toggleOfferForm(true)}
        >
          Make an offer
        </button>
        <button
          className="visit visit-button"
          onClick={() => toggleVisitForm(true)}
        >
          Request a visit
        </button>
        <button className="calc calc-button" onClick={() => toggleForm(true)}>
          Mortgage Calculator
        </button>
        {isFormOpen && (
          <MortgageCalculator
            isOpen={isFormOpen}
            onClose={toggleForm}
            property={property}
          />
        )}
        {isVisitForm && (
          <VisitForm
            isFormOpen={isVisitForm}
            closeForm={toggleVisitForm}
            property={property}
          />
        )}

        {isOfferForm && (
          <OfferForm
            isFormOpen={isOfferForm}
            closeForm={toggleOfferForm}
            property={property}
            address={address}
            brokerInfo={brokerInfo}
            broker={broker}
          />
        )}
      </div>
    </div>
  );
};

export default DetailedCard;
