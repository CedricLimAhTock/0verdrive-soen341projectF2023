import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DashboardDetails/styles/Users.css";
import "./VisitForm.css";
import jwt_decode from "jwt-decode";
import Carousel from "../Carousel/Carousel";

const VisitForm = ({ isFormOpen, closeForm, property }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const { images, price, address, broker } = property;
  const [decodedToken, setDecodedToken] = React.useState(null);

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("jwtToken");
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    }

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      alert(`Email: ${email}\nPhone: ${phone}\nMessage: ${message}`);
      const response = await axios.post("http:127.0.0.1:8080/visit/", {
        propertyId: property.id.toString(),
        client_id: decodedToken.id.toString(),
        broker_id: property.broker_id.toString(),
      });

      if (response.status === 200) {
        alert("Form submitted");
        console.log(response);
      } else {
        console.log(response);
        console.log("Failed to submit form");
      }
    } catch (err) {
      alert(err.message);
      console.log("Error submitting form");
      console.error(err);
    }
  };

  return (
    <div className={isFormOpen ? "show" : "hide"}>
      <form className="popup-form" onSubmit={handleSubmit}>
        <button onClick={closeForm} className='close-button'>Close</button>
        <h2>Visit Form</h2>
        <div className="left-visit">
          <Carousel images={images} className="carousel-visit" />
          <div className="property-info-visit">
            <h3>Price: ${price}</h3>
            <h4>Address: {address}</h4>
            <p>Broker: {broker}</p>
          </div>
        </div>
        <div className="right-visit">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            placeholder="Enter your message here"
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="button-container">
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VisitForm;
